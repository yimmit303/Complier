set ANTLR="C:\\Users\\Tim\Downloads\\Programming_Files\\Compiler\\Complier\\antlr-4.8-complete.jar"
set JAVA="C:\\Program Files\\Java\\jre1.8.0_144\\bin\\java.exe"
%JAVA% -cp %ANTLR% org.antlr.v4.Tool -Dlanguage=JavaScript "%1"
