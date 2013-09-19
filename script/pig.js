FSO = {
    cdlOFNHideReadOnly: 4,
    cdlOFNAllowMultiselect: 512,
    cdlOFNPathMustExist: 2048,
    cdlOFNFileMustExist: 4096,
    cdlOFNExplorer: 524288,

    ModeRead: 1,
    ModeWrite: 2,
    CreateNewFile: true,
    TypeUnicode: -1,
    TypeASCII: 0,
    TypeDefault: -2
};

FSO.select = function() {
    var dialog = null;
    try {
        // Vista
        dialog = new ActiveXObject("MsComDlg.CommonDialog");
        dialog.DialogTitle = "选择文件";
        dialog.MaxFileSize = Math.pow(2, 15) - 1; // 32KB
        dialog.Flags = this.cdlOFNAllowMultiselect;
    } catch(e) {
        // Win XP
        dialog = new ActiveXObject("UserAccounts.CommonDialog");
        dialog.Flags = 0;
    }

    dialog.Flags += this.cdlOFNHideReadOnly;
    dialog.Flags += this.cdlOFNExplorer;
    dialog.Flags += this.cdlOFNFileMustExist;

    dialog.Filter = "文本文档(*.txt)|*.txt|所有文件  (*.*)|*.*";
    dialog.FilterIndex = 1;
    dialog.ShowOpen();
    return dialog.FileName.split(String.fromCharCode(0));
};

FSO.save = function () {
    var dialog = null;
    try {
        // Vista
        dialog = new ActiveXObject("MsComDlg.CommonDialog");
        dialog.DialogTitle = "保存路径";
        dialog.MaxFileSize = Math.pow(2, 15) - 1; // 32KB
    } catch(e) {
        // Win XP
        dialog = new ActiveXObject("UserAccounts.CommonDialog");
    }

    dialog.Flags = this.cdlOFNHideReadOnly + this.cdlOFNPathMustExist;
    dialog.Filter = "网页 (*.html)|*.html|所有文件(*.*)|*.*";
    dialog.FilterIndex = 1;
    dialog.ShowSave();
    return dialog.FileName;
};

FSO.open = function (filename, mode, type) {
    if (!type) {
        type = this.TypeDefault;
    }
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    if (mode == this.ModeRead) {
        return fso.OpenTextFile(filename, mode, !this.CreateNewFile, type);
    } else if (mode == this.ModeWrite) {
        return fso.OpenTextFile(filename, mode, this.CreateNewFile, type);
    } else {
        return null;
    }
};

var Pig = {
    width: 370,
    height: 300,
    config_file: '',
    list: [
      {
        num: 1,
        word: 'A',
        phonetic_alphabet: 'ei',
        paraphrase: '一个'
      }
    ]
};

Pig.init = function () {
    if (this.config_file == '') {
        var o = new ActiveXObject("WScript.Shell");
        this.config_file = o.CurrentDirectory + '\\script\\config.json';
    }
    var fin = FSO.open(this.config_file, FSO.ModeRead);
    eval('Pig.configure = ' + fin.ReadAll());
    fin.close();
}

Pig.save = function () {
    var fout = FSO.open(this.config_file, FSO.ModeWrite);
    fout.WriteLine('{');
    fout.WriteLine('  overwrite: ' + (this.configure.overwrite ? 'true' : 'false') + ',');
    fout.WriteLine('  single: ' + (this.configure.single ? 'true' : 'false') + ',');
    fout.WriteLine('  output_path: "' + this.configure.output_path.replace(/\\/g, '\\\\') + '",');
    fout.WriteLine('  style: "' + this.configure.style + '",');
    fout.WriteLine('  output: [');
    if (this.configure.output.length > 0) {
        fout.WriteLine('    "' + this.configure.output.join('",\r\n    "') + '"');
    }
    fout.WriteLine('  ]');
    fout.WriteLine('};');
    fout.close();
};

Pig.generateOutputFileName = function (file) {
    var prefix = file.replace(/(\.[^.]*)?$/, '');
    var name = prefix + '.html';
    if (Pig.configure.overwrite) {
        return name;
    }

    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var i = 0;
    while (fso.FileExists(name)) {
        i++;
        name = prefix + '(' + i + ').html';
    }
    return name;
};

Pig.load = function (file) {
    var fin = FSO.open(file, FSO.ModeRead, FSO.TypeUnicode);
    var item = {};
    while (!fin.AtEndOfStream) {
        var line = fin.ReadLine();
        if (line == '$3') {
            item.num = Pig.list.length + 1;
            Pig.list[Pig.list.length] = item;
            item = {};
        } else if (line.charAt(0) == '+') {
            item.word = line.substr(1);
        } else if (line.charAt(0) == '&') {
            item.phonetic_alphabet = line.substr(1);
        } else if (line.charAt(0) == '#') {
            if (item.paraphrase) {
                item.paraphrase += '<br/>' + line.substr(1);
            } else {
                item.paraphrase = line.substr(1);
            }
        }
    }
    fin.close();
};

Pig.generateHTML = function (file) {
    var thead = {
        num: '          <th class="item_id">序号</th>',
        word: '          <th class="item_wd">单词</th>',
        phonetic_alphabet: '          <th class="item_pa">音标</th>',
        paraphrase: '          <th class="item_ex">解释</th>'
    };
    var tbody = {
        num: '          <td class="item_id" align="center" valign="middle">KEY</td>',
        word: '          <td class="item_wd" valign="middle">KEY</td>',
        phonetic_alphabet: '          <td class="item_pa" valign="middle">[KEY]</td>',
        paraphrase: '          <td class="item_ex" valign="middle">KEY</td>'
    };

    var fout = FSO.open(file, FSO.ModeWrite, FSO.TypeUnicode);

    fout.WriteLine('<html>');
    fout.WriteLine('  <head>');
    fout.WriteLine('    <title>生词本 - 列表</title>');
    fout.WriteLine('    <meta http-equiv="Content-Type" content="text/html; charset=UTF-16" />');
    fout.WriteLine('    <style type="text/css">');
    fout.WriteLine('      table { font-family: 宋体; }');
    fout.WriteLine('      th { font-size: 14px }');
    fout.WriteLine('      .item_id { width: 30px; }');
    fout.WriteLine('      .item_wd { width: 160px; }');
    fout.WriteLine('      .item_pa { width: 210px; color: Blue; }');
    fout.WriteLine('      .item_ex { width: 400px; }');
    fout.WriteLine('      th.item_pa { color: Black; }');
    fout.WriteLine('      td { font-size: 12px }');
    fout.WriteLine('    </style>');
    fout.WriteLine('  </head>');
    fout.WriteLine('  <body>');
    fout.WriteLine('    <table align="center" border="1" cellpadding="0" cellspacing="0">');
    fout.WriteLine('      <thead>');
    fout.WriteLine('        <tr>');
    for (var i = 0; i < Pig.configure.output.length; i++) {
        fout.WriteLine(thead[Pig.configure.output[i]]);
    }
    fout.WriteLine('        </tr>');
    fout.WriteLine('      </thead>');
    fout.WriteLine('      <tbody>');
    for (var r = 0; r < Pig.list.length; r++) {
        fout.WriteLine('        <tr>');
        for (var i = 0; i < Pig.configure.output.length; i++) {
            var key = Pig.configure.output[i];
            var html = tbody[key].replace('KEY', Pig.list[r][key]);
            fout.WriteLine(html);
        }
        fout.WriteLine('        </tr>');
    }
    fout.WriteLine('      </tbody>');
    fout.WriteLine('    </table>');
    fout.WriteLine('  </body>');
    fout.WriteLine('</html>');

    fout.close();
};

Pig.generateEXCEL = function (file) {
    alert('暂不支持');
}

$(function () {
    /* init */
    resizeTo(Pig.width, Pig.height);
    moveTo((screen.width - Pig.width) / 3, (screen.height - Pig.height) / 3);
    $('.pane').hide();
    $('#Pane_Main').show();
    Pig.init();

    $('#Menu_Set').click(function () {
        $('.pane').hide();

        if (Pig.configure.overwrite) {
            $('#set_overwrite').attr('checked', 'checked');
        } else {
            $('#set_overwrite').removeAttr('checked');
        }
        if (Pig.configure.single) {
            $('#set_single').attr('checked', 'checked');
            $('#Button_Browse').removeAttr('disabled');
        } else {
            $('#set_single').removeAttr('checked');
            $('#Button_Browse').attr('disabled', 'disabled');
        }
        if (Pig.configure.output_path) {
            $('#text_output_path').val(Pig.configure.output_path);
        } else {
            $('#text_output_path').val('');
        }

        $('#Pane_Set').show();
    });
    $('#Menu_Style').click(function () {
        $('.pane').hide();

        $('.output_style option').removeAttr('selected');
        if (Pig.configure.style) {
            $('option[value=' + Pig.configure.style + ']').attr('selected', 'selected');
        }
        $('.style_item input').removeAttr('checked');
        if (Pig.configure.output) {
            for (var i = 0; i < Pig.configure.output.length; i++) {
                $('#set_' + Pig.configure.output[i]).attr('checked', 'checked');
            }
        }

        $('#Pane_Style').show();
    });
    $('#Menu_Exit').click(function () {
        window.close();
    });
    $('.save, .cancel').click(function () {
        $('.pane').hide();
        $('#Pane_Main').show();
    });
    $('#Button_Set_Save').click(function () {
        Pig.configure.overwrite = $('#set_overwrite:checked').length != 0;
        Pig.configure.single = $('#set_single:checked').length != 0;
        Pig.configure.output_path = $('#text_output_path').val();
        Pig.save();
    });
    $('#Button_Style_Save').click(function () {
        Pig.configure.style = $('.output_style option:selected').val();
        Pig.configure.output = [];
        var output = $('.style_item input:checked');
        for (var i = 0; i < output.length; i++) {
            Pig.configure.output[i] = output[i].id.substr(4);
        }
        Pig.save();
    });

    var add_item = function () {
        var files = FSO.select();
        if (files[0] == "") {
            // Cancel
            // Just Ignore
        } else if (files.length == 1) {
            var path = files[0];
            var name = path.substr(path.lastIndexOf('\\') + 1);
            $('#files').append('<option value="' + path + '">' + name + '</option>')
        } else {
            for (var i = 1; i < files.length; i++) {
                $('#files').append('<option value="' + files[0] + '\\' + files[i] + '">' + files[i] + '</option>')
            }
        }
    };

    $('#Button_Add').click(add_item);
    $('#Menu_Add').click(add_item);
    $('#Button_Delete').click(function () {
        $('#files option:selected').remove();
    });
    $('#Menu_Delete').click(function () {
        $('#files option:selected').remove();
    });

    $('#set_single').click(function () {
        if ($(this).attr('checked')) {
            $('#Button_Browse').removeAttr('disabled');
        } else {
            $('#Button_Browse').attr('disabled', 'disabled');
            $('#text_output_path').val('');
        }
    });
    $('#Button_Browse').click(function () {
        $('#text_output_path').val(FSO.save());
    });

    $('#Button_Convert').click(function () {
        var files = $('#files option');

        if (Pig.configure.single) {
            Pig.list = [];
            for (var i = 0; i < files.length; i++) {
                Pig.load($(files[i]).val());
            }
            var output_file = Pig.generateOutputFileName(Pig.configure.output_path);
            Pig['generate' + Pig.configure.style](output_file);
        } else {
            for (var i = 0; i < files.length; i++) {
                Pig.list = [];
                Pig.load($(files[i]).val());
                var output_file = Pig.generateOutputFileName($(files[i]).val());
                Pig['generate' + Pig.configure.style](output_file);
            }
        }
        $('#files').empty();
        alert('一共处理 ' + files.length + ' 个文件');
    });

    // Hot Key
    $(document).keydown(function (e) {
        if (e.ctrlKey && e.keyCode == 73) {
            // Ctrl + I
            add_item();
        } else if (e.ctrlKey && e.keyCode == 68) {
            // Ctrl + D
            $('#files option:selected').remove();
        } else if (e.ctrlKey && e.keyCode == 81) {
            // Ctrl + Q
            window.close();
        } else if (e.keyCode == 112) {
            // F1
            window.open('help.html');
        } else if (e.keyCode == 116) {
            // Ignore F5(Refresh)
            return false;
        }
    });
});
