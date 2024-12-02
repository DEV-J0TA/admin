@echo off
setlocal

REM Solicita o repositório remoto
set /p REPO_URL=Digite a URL do repositório Git (ex: https://github.com/usuario/repositorio.git): 

REM Configura o repositório remoto
echo Verificando repositório remoto...
git remote -v >nul 2>nul
if errorlevel 1 (
    echo Nenhum repositório remoto configurado. Adicionando origin...
    git remote add origin %REPO_URL%
) else (
    echo O repositório remoto já está configurado.
)

REM Adiciona arquivos ao repositório
echo Adicionando arquivos ao repositório...
git add .

REM Solicita uma mensagem de commit
set /p COMMIT_MSG=Digite uma mensagem de commit: 
if "%COMMIT_MSG%"=="" set COMMIT_MSG="Atualização automática"

REM Faz o commit
git commit -m "%COMMIT_MSG%"

REM Configura a branch principal como main, se necessário
git branch | findstr "main" >nul
if errorlevel 1 (
    git branch -M main
)

REM Faz o push para o repositório remoto
echo Enviando arquivos para o repositório remoto...
git push -u origin main

echo Operação concluída! Pressione qualquer tecla para sair.
pause
