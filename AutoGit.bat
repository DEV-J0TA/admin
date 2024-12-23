@echo off
setlocal enabledelayedexpansion

REM Menu inicial
:menu
cls
echo =========================================
echo SELECIONE UMA OPCAO:
echo =========================================
echo 1. Executar em Modo Depuracao
echo 2. Executar em Modo Automatico
echo 3. Instalar Dependencias
echo =========================================
set /p CHOICE=Digite o numero da opcao e pressione ENTER: 

if "%CHOICE%"=="1" goto :debug_mode
if "%CHOICE%"=="2" goto :auto_mode
if "%CHOICE%"=="3" goto :install_dependencies
echo Opcao invalida. Tente novamente.
pause
goto :menu

:debug_mode
set DEBUG_MODE=1
goto :start

:auto_mode
set DEBUG_MODE=0
goto :start

:install_dependencies
echo Instalando dependencias...
npm install react react-dom @mui/material @emotion/react @emotion/styled axios uuid
if errorlevel 1 (
    echo ERRO: Falha ao instalar dependencias.
    pause
    exit /b
)
echo Dependencias instaladas com sucesso!
pause
goto :menu

:start
REM Variável para controlar se houve erro
set ERROR_FLAG=0

REM Verifica se o diretório é um repositório Git
if not exist ".git" (
    echo Verificando se o diretório é um repositório Git...
    git init
    if errorlevel 1 (
        echo ERRO: Falha ao inicializar o repositório Git.
        set ERROR_FLAG=1
        if "!DEBUG_MODE!"=="1" pause
        goto :end
    )
    echo Repositório Git inicializado com sucesso.
    echo Criando arquivo README.md para o commit inicial...
    echo "# Novo Repositório" > README.md
    git add README.md
    git commit -m "Commit inicial"
    if errorlevel 1 (
        echo ERRO: Falha ao realizar o commit inicial.
        set ERROR_FLAG=1
        if "!DEBUG_MODE!"=="1" pause
        goto :end
    )
    echo Commit inicial realizado com sucesso.
)

REM Verifica se o arquivo package.json existe
if not exist "package.json" (
    echo ERRO: O arquivo package.json não foi encontrado. Certifique-se de que está no diretório correto.
    set ERROR_FLAG=1
    if "!DEBUG_MODE!"=="1" pause
    goto :end
)

REM Ajusta o arquivo package.json
echo Verificando se as configurações já existem no package.json...
findstr /c:"\"homepage\"" package.json >nul
if errorlevel 1 (
    echo Adicionando homepage ao package.json...
    powershell -Command "(Get-Content package.json) -replace '{', '{`n  \"homepage\": \"https://usuario.github.io/repositorio\",' | Set-Content package.json"
) else (
    echo A configuração homepage já existe no package.json.
)

findstr /c:"\"predeploy\"" package.json >nul
if errorlevel 1 (
    echo Adicionando script predeploy ao package.json...
    powershell -Command "(Get-Content package.json) -replace '\"scripts\": {', '\"scripts\": {`n    \"predeploy\": \"npm run build\",' | Set-Content package.json"
) else (
    echo O script predeploy já existe no package.json.
)

findstr /c:"\"deploy\"" package.json >nul
if errorlevel 1 (
    echo Adicionando script deploy ao package.json...
    powershell -Command "(Get-Content package.json) -replace '\"scripts\": {', '\"scripts\": {`n    \"deploy\": \"gh-pages -d build\",' | Set-Content package.json"
) else (
    echo O script deploy já existe no package.json.
)

if "!DEBUG_MODE!"=="1" pause

REM Adiciona arquivos ao repositório
git add .
if errorlevel 1 (
    echo ERRO: Falha ao adicionar arquivos ao índice.
    set ERROR_FLAG=1
    if "!DEBUG_MODE!"=="1" pause
    goto :end
)
echo Arquivos adicionados ao índice com sucesso.
if "!DEBUG_MODE!"=="1" pause

REM Solicita mensagem de commit
set /p COMMIT_MSG=Digite uma mensagem de commit: 
if "!COMMIT_MSG!"=="" set COMMIT_MSG=Atualização automática
git commit -m "!COMMIT_MSG!"
if errorlevel 1 (
    echo Nenhuma alteração detectada para commit.
    if "!DEBUG_MODE!"=="1" pause
) else (
    echo Commit realizado com sucesso.
)

if "!DEBUG_MODE!"=="1" pause

REM Push para main ou master
git push -u origin main
if errorlevel 1 (
    git branch | findstr "master" >nul
    if errorlevel 1 (
        git checkout -b master
    )
    git push -u origin master
    if errorlevel 1 (
        echo ERRO: Falha ao realizar push para main e master.
        set ERROR_FLAG=1
        if "!DEBUG_MODE!"=="1" pause
        goto :end
    )
    echo Push realizado com sucesso para a branch master.
) else (
    echo Push realizado com sucesso para a branch main.
)

if "!DEBUG_MODE!"=="1" pause

REM Executa npm run deploy
npm run deploy
if errorlevel 1 (
    echo ERRO: Falha ao executar npm run deploy.
    set ERROR_FLAG=1
    if "!DEBUG_MODE!"=="1" pause
    goto :end
)
echo npm run deploy executado com sucesso.

if "!DEBUG_MODE!"=="1" pause

:end
if "!ERROR_FLAG!"=="1" (
    echo Ocorreu um erro durante a execução do script.
) else (
    echo Script concluído com sucesso!
)
if "!DEBUG_MODE!"=="1" pause
exit /b
