Sub Menu_About_OnClick
  Dim msg
  msg = ""
  msg = msg & "程序名称：Pig - [梦婷轩系列] - 子清行" & vbCrLf & vbCrLf
  msg = msg & "版本信息：0.7.3" & vbCrLf & vbCrLf
  msg = msg & "作　　者：redraiment" & vbCrLf & vbCrLf
  msg = msg & "电子邮箱：redraiment@gmail.com" & vbCrLf & vbCrLf
  msg = msg & "子 清 行：" & vbCrLf
  msg = msg & "http://blog.csdn.net/redraiment"
  MsgBox msg, vbOKOnly, "关于 Pig"
End Sub
