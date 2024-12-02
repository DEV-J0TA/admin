@echo off
setlocal enabledelayedexpansion

REM Ativar o modo de depuração para exibir cada comando antes de sua execução
echo DEPURAÇÃO INICIADA: Cada comando será mostrado.
pause

REM Variável para controlar se houve erro
set ERROR_FLAG=0

echo Verificando se o diretório é um repositório Git...
if not exist ".git" (
    echo Diretório não contém repositório Git. Inicializando...
    git init
    if errorlevel 1 (
        echo ERRO: Falha ao inicializar o repositório Git.
        set ERROR_FLAG=1
        pause
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
        pause
        goto :end
    )
    echo Commit inicial realizado com sucesso.
)

REM Verifica se o arquivo package.json existe
if not exist "package.json" (
    echo ERRO: O arquivo package.json não foi encontrado. Certifique-se de que está no diretório correto.
    set ERROR_FLAG=1
    pause
    goto :end
)

REM Verificando e ajustando o arquivo package.json
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

pause

REM Adiciona arquivos ao repositório
echo Adicionando arquivos ao repositório...
git add .
if errorlevel 1 (
    echo ERRO: Falha ao adicionar arquivos ao índice.
    set ERROR_FLAG=1
    pause
    goto :end
)
echo Arquivos adicionados ao índice com sucesso.
pause

REM Solicita mensagem de commit
set /p COMMIT_MSG=Digite uma mensagem de commit: 
if "!COMMIT_MSG!"=="" set COMMIT_MSG=Atualização automática
echo Realizando commit: "!COMMIT_MSG!"
git commit -m "!COMMIT_MSG!"
if errorlevel 1 (
    echo Nenhuma alteração detectada para commit.
    pause
) else (
    echo Commit realizado com sucesso.
    pause
)

REM Tenta fazer o push para main ou master
echo Tentando push para a branch main...
git push -u origin main
if errorlevel 1 (
    echo Falha no push para main. Tentando push para master...
    git branch | findstr "master" >nul
    if errorlevel 1 (
        echo Branch master não encontrada. Criando branch master...
        git checkout -b master
    )
    git push -u origin master
    if errorlevel 1 (
        echo ERRO: Falha ao realizar push para main e master.
        set ERROR_FLAG=1
        pause
        goto :end
    )
    echo Push realizado com sucesso para a branch master.
) else (
    echo Push realizado com sucesso para a branch main.
)

pause

:end
if !ERROR_FLAG!==1 (
    echo Ocorreu um erro durante a execução do script.
    echo Consulte as mensagens acima para mais detalhes.
) else (
    echo Script concluído com sucesso!
)
pause
