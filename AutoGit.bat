@echo off
setlocal

REM Solicita o repositório remoto ao usuário
set /p REPO_URL=Digite a URL do repositório Git (ex: https://github.com/usuario/repositorio.git): 

REM Define o nome do diretório do repositório com base na URL
for /f "tokens=*" %%i in ('echo %REPO_URL% ^| findstr /r "[^/]*$"') do set REPO_NAME=%%i
set REPO_NAME=%REPO_NAME:~0,-4% REM Remove a extensão .git se existir

REM Verifica se o diretório atual é um repositório Git
if exist ".git" (
    echo Este diretório já é um repositório Git.
) else (
    echo Inicializando um novo repositório Git...
    git init
    git remote add origin %REPO_URL%
)

REM Adiciona todos os arquivos ao repositório
echo Adicionando arquivos ao repositório...
git add .

REM Solicita uma mensagem de commit
set /p COMMIT_MSG=Digite uma mensagem de commit: 
if "%COMMIT_MSG%"=="" set COMMIT_MSG="Atualização automática"

REM Faz o commit
git commit -m "%COMMIT_MSG%"

REM Verifica se a branch principal existe e cria caso necessário
git branch | findstr "main" >nul
if errorlevel 1 (
    git branch -M main
)

REM Faz o push para o repositório remoto
echo Enviando arquivos para o repositório remoto...
git push -u origin main

echo Operação concluída! Pressione qualquer tecla para sair.
pause
