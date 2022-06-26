
class Moradia

{   
    pais; // pais
    estado; // estado
    logradouro; // logradouro
    bairro; // bairro1
    endereco; // endereco 
    cep; // cep
    
    getPais() {
        return pais;
    }
    setPais(pais) {
        this.pais = pais;
    }
    getEstado() {
        return estado;
    }
    setEstado(estado) {
        this.estado = estado;
    }
    getLogradouro() {
        return logradouro;
    }
    setLogradouro(logradouro) {
        this.logradouro = logradouro;
    }
     getBairro() {
        return bairro;
    }
    setBairro(bairro) {
        this.bairro = bairro;
    }
     getEndereco() {
        return endereco;
    }
    setEndereco(endereco) {
        this.endereco = endereco;
    }
    getCep() {
        return cep;
    }
    setCep(cep) {
        this.cep = cep;
    }
}

class Cliente 
{
    cpf; // cpf
    nome; // nome_completo
    dtNasc; // dt_nasc
    dtReg; // dt_reg
    sexo;
    telCont1; // tel_cont1
    telCont2; // tel_cont2
    email; // email

    moradia;


    getCpf() {
        return cpf;
    }
    setCpf(cpf) {
        this.cpf = cpf;
    }
    getNome() {
        return nome;
    }
    setNome(nome) {
        this.nome = nome;
    }
    getDtNasc() {
        return dtNasc;
    }
    setDtNasc(dtNasc) {
        this.dtNasc = dtNasc;
    }
    getDtReg() {
        return dtReg;
    }
    setDtReg(dtReg) {
        this.dtReg = dtReg;
    }
    getTelCont1() {
        return telCont1;
    }
    setTelCont1(telCont1) {
        this.telCont1 = telCont1;
    }
    getTelCont2() {
        return telCont2;
    }
    setTelCont2(telCont2) {
        this.telCont2 = telCont2;
    }
    getEmail() {
        return email;
    }
    setEmail(email) {
        this.email = email;
    }
    setSexo(sexo)
    {
        this.sexo = sexo;
    }
    getSexo()
    {
        return sexo;
    }
    setMoradia(moradia)
    {
        this.moradia = moradia;
    }
    getMoradia()
    {
        return this.moradia;
    }
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [];
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient));

// CRUD 

const readClient = () => getLocalStorage();

const deleteClient = (index) => {
    const dbClient = readClient();
    dbClient.splice(index, 1);
    setLocalStorage(dbClient);
}

const updateClient = (index, client) => {
    const dbClient = readClient();
    dbClient[index] = client;
    setLocalStorage(dbClient);
}


const createClient = (client) => {
    const dbClient = getLocalStorage();
    dbClient.push(client);
    setLocalStorage(dbClient);
}

function handleBtnRegistrarClick()
{
    var objInputNome = document.getElementById("nomeInput");
    var objInputCpf = document.getElementById("cpfInput");
    var objInputDtNasc = document.getElementById("dtNascInput");

    if (objInputNome.value === "" || objInputCpf.value === "" || objInputDtNasc.value === "")
    {
        window.alert("Campos obrigatórios não preenchidos!");
        return;
    }
    else
    {
        if (readClient().find(x => x.cpf === String(objInputCpf.value)))
        {
            window.alert("Duplicidade detectada! CPF ja em uso!! ;-;");

            var filho = window.document.createElement("h1")
            filho.setAttribute("id", "h1FailResult");
            var texto  = document.createTextNode("ERRO!! \n;-;");
            filho.appendChild(texto);
            document.getElementById("conteudo-principal").appendChild(filho);

            setTimeout(() => {
                document.getElementById("conteudo-principal").removeChild(document.getElementById("h1FailResult"));
            }, 5000);
            
            return;
        }

        var cliente = new Cliente();
        var moradia = new Moradia();

        cliente.setCpf(String(document.getElementById("cpfInput").value));
        cliente.setNome(String(document.getElementById("nomeInput").value));
        cliente.setDtNasc(document.getElementById("dtNascInput").value);
        cliente.setDtReg(document.getElementById("dtReg").value);
        cliente.setSexo(document.querySelector('input[name="Rsexo"]:checked').value);
        cliente.setTelCont1(document.getElementById("telCont1Input").value);
        cliente.setTelCont2(document.getElementById("telCont2Input").value);
        cliente.setEmail(document.getElementById("emailInput").value);

        moradia.setPais(document.getElementById("cb_pais").options[document.getElementById("cb_pais").selectedIndex].text);
        moradia.setEstado(document.getElementById("cb_estado").options[document.getElementById("cb_estado").selectedIndex].text);
        moradia.setLogradouro(document.getElementById("cb_cidade").options[document.getElementById("cb_cidade").selectedIndex].text);
        moradia.setBairro(document.getElementById("bairroInput").value);
        moradia.setEndereco(document.getElementById("enderecoInput").value);
        moradia.setCep(document.getElementById("cepInput").value);

        cliente.setMoradia(moradia);

        createClient(cliente);
        console.log(readClient());

        var filho = window.document.createElement("h1")
        filho.setAttribute("id", "h1SucessResult");
        var texto  = document.createTextNode("SUCESSO! \n;D");
        filho.appendChild(texto);
        document.getElementById("conteudo-principal").appendChild(filho);

        setTimeout(() => {
            document.getElementById("conteudo-principal").removeChild(document.getElementById("h1SucessResult"));
        }, 5000);

    }
}

function handleBtnAtualizarClick()
{
    var objInputNome = document.getElementById("nomeInput");
    var objInputCpf = document.getElementById("cpfInput");
    var objInputDtNasc = document.getElementById("dtNascInput");

    if (objInputNome.value === "" || objInputCpf.value === "" || objInputDtNasc.value === "")
    {
        window.alert("Campos obrigatórios não preenchidos!");
        return;
    }
    else
    {
        if (!readClient().find(x => x.cpf === String(objInputCpf.value)))
        {
            window.alert("Para atualizar um registro, é necessário informar um CPF Válido! este CPF: "+ objInputCpf.value + ", encontra-se disponível para uso! ;D");           
           
            var filho = window.document.createElement("h1")
            filho.setAttribute("id", "h1FailResult");
            var texto  = document.createTextNode("ERRO!! \n;-;");
            filho.appendChild(texto);
            document.getElementById("conteudo-principal").appendChild(filho);

            setTimeout(() => {
                document.getElementById("conteudo-principal").removeChild(document.getElementById("h1FailResult"));
            }, 5000);

            return;
        }
        var cliente = new Cliente();
        var moradia = new Moradia();

        cliente.setNome(objInputNome.value);
        cliente.setCpf(objInputCpf.value);
        cliente.setDtNasc(objInputDtNasc.value);
        cliente.setDtReg(document.getElementById("dtReg").value);
        cliente.setSexo(document.querySelector('input[name="Rsexo"]:checked').value);
        cliente.setTelCont1(document.getElementById("telCont1Input").value);
        cliente.setTelCont2(document.getElementById("telCont2Input").value);
        cliente.setEmail(document.getElementById("emailInput").value);

        moradia.setPais(document.getElementById("cb_pais").options[document.getElementById("cb_pais").selectedIndex].text);
        moradia.setEstado(document.getElementById("cb_estado").options[document.getElementById("cb_estado").selectedIndex].text);
        moradia.setLogradouro(document.getElementById("cb_cidade").options[document.getElementById("cb_cidade").selectedIndex].text);
        moradia.setBairro(document.getElementById("bairroInput").value);
        moradia.setEndereco(document.getElementById("enderecoInput").value);
        moradia.setCep(document.getElementById("cepInput").value);

        cliente.setMoradia(moradia);

        let indexOfCliente = readClient().findIndex(x => x.cpf === String(objInputCpf.value));
        updateClient(indexOfCliente, cliente);
        console.log(readClient());

        var filho = window.document.createElement("h1")
        filho.setAttribute("id", "h1SucessResult");
        var texto  = document.createTextNode("SUCESSO! \n;D");
        filho.appendChild(texto);
        document.getElementById("conteudo-principal").appendChild(filho);

        setTimeout(() => {
            document.getElementById("conteudo-principal").removeChild(document.getElementById("h1SucessResult"));
        }, 5000);
    }
}

function handleBtnDeletarClick()
{
    var objInputCpf = document.getElementById("cpfInput");

    if (objInputCpf.value === "")
    {
        if(window.confirm("È necessário informar o CPF do cliente que deseja realizar a deleção!\nDeseja deletar TODOS os clientes?"))
        {
            const dbClient = [];
            setLocalStorage(dbClient);
            console.log(readClient());
            return;
        }   
        var filho = window.document.createElement("h1")
        filho.setAttribute("id", "h1FailResult");
        var texto  = document.createTextNode("ERRO!! \n;-;");
        filho.appendChild(texto);
        document.getElementById("conteudo-principal").appendChild(filho);

        setTimeout(() => {
            document.getElementById("conteudo-principal").removeChild(document.getElementById("h1FailResult"));
        }, 5000);    
    }
    else
    {
        if (!readClient().find(x => x.cpf === String(objInputCpf.value)))
        {
            window.alert("Para deletar um registro, é necessário informar um CPF Válido! este CPF: "+ objInputCpf.value + ", encontra-se disponível para uso! ;D");
            
            var filho = window.document.createElement("h1")
            filho.setAttribute("id", "h1FailResult");
            var texto  = document.createTextNode("ERRO!! \n;-;");
            filho.appendChild(texto);
            document.getElementById("conteudo-principal").appendChild(filho);

            setTimeout(() => {
                document.getElementById("conteudo-principal").removeChild(document.getElementById("h1FailResult"));
            }, 5000);
            
            return;
        }

        let indexOfCliente = readClient().findIndex(x => x.cpf === String(objInputCpf.value));
        deleteClient(indexOfCliente);
        console.log(readClient());

        var filho = window.document.createElement("h1")
        filho.setAttribute("id", "h1SucessResult");
        var texto  = document.createTextNode("SUCESSO! \n;D");
        filho.appendChild(texto);
        document.getElementById("conteudo-principal").appendChild(filho);

        setTimeout(() => {
            document.getElementById("conteudo-principal").removeChild(document.getElementById("h1SucessResult"));
        }, 5000);
    }
}

function handleBtnLimparClick()
{
    document.getElementById("nomeInput").value = '';
    document.getElementById("cpfInput").value = '';
    document.getElementById("dtNascInput)").value = new Date().getDate;
    document.getElementById("dtReg").value = new Date().getDate();
    document.getElementById("telCont1Input").value = '';
    document.getElementById("telCont2Input").value = '';
    document.getElementById("emailInput").value = '';

    document.getElementById("bairroInput").value = '';
    document.getElementById("enderecoInput").value = '';
    document.getElementById("cepInput").value = '';
}

function handleBtnProcurarNomeClick()
{
    try 
    {
        var objInputNome = document.getElementById("nomeInput");
        var listaClientes = readClient(); 

        if (listaClientes.length == 0)
        {   // nenhum cliente foi registrado ainda!

            window.alert("Nenhum cliente foi adicionado ainda! ;-;");

            if (document.getElementById("tBodyModalProcurar") !== undefined) 
            {
                document.getElementById("tBodyModalProcurar").outerHTML = "";
            }            

            return;
        }
        else if (String(objInputNome.value).replace(/ /g, "") === "")
        { // Retorna all clientes em janela modal

            atualizaTabelaModal(listaClientes);
        }
        else 
        { // Consulta um cliente com o nome

            var listaClientesPeloNome = listaClientes.filter(x => x.nome === String(objInputNome.value).replace(/ /g, ""));
            atualizaTabelaModal(listaClientesPeloNome);
        }
    }
    catch (ex) 
    {
        console.log(ex);
    }
}

function handleBtnProcurarCPFClick()
{
    try 
    {
        var objInputCpf = document.getElementById("cpfInput");
        var listaClientes = readClient(); 

        if (listaClientes.length === 0)
        {   // nenhum cliente foi registrado ainda!

            window.alert("Nenhum cliente foi adicionado ainda! ;-;");

            document.getElementById("modalProcurar").outerHTML = "";

            if (document.getElementById("tBodyModalProcurar") !== undefined) 
            {
                document.getElementById("tBodyModalProcurar").outerHTML = "";
            }            

            return;
        }
        else if (String(objInputCpf.value).replace(/ /g, "") === "")
        { // Retorna all clientes em janela modal

            atualizaTabelaModal(listaClientes);
        }
        else 
        { // Consulta um cliente com o cpf

            var listaClientesPeloNome = listaClientes.filter(x => x.cpf === String(objInputCpf.value).replace(/ /g, ""));
            atualizaTabelaModal(listaClientesPeloNome);
        }
    }
    catch (ex) 
    {
        console.log(ex);
    }
}

function atualizaTabelaModal(listaClientes)
{
    if (document.getElementById("tBodyModalProcurar") !== undefined) 
    {
        document.getElementById("tBodyModalProcurar").outerHTML = "";
    }

    var objModalProcurarDiv = document.createElement("tbody");
    objModalProcurarDiv.setAttribute("id", "tBodyModalProcurar");

    for (let i = 0; i < listaClientes.length; i++)
    {
        var filhoTr = document.createElement("tr");
        filhoTr.setAttribute("id", "trProcurar"+(i+1));

        var filhoTdNome = document.createElement("td");
        filhoTdNome.appendChild(document.createTextNode(listaClientes[i].nome));

        var filhoTdCPF = document.createElement("td");
        filhoTdCPF.appendChild(document.createTextNode(listaClientes[i].cpf));

        var filhoTdDtNasc = document.createElement("td");
        filhoTdDtNasc.appendChild(document.createTextNode(listaClientes[i].dtNasc));

        var filhoTdSexo = document.createElement("td");
        filhoTdSexo.appendChild(document.createTextNode(listaClientes[i].sexo));

        var filhoTdEmail = document.createElement("td");
        filhoTdEmail.appendChild(document.createTextNode(listaClientes[i].email));


        filhoTr.appendChild(filhoTdNome);
        filhoTr.appendChild(filhoTdCPF);
        filhoTr.appendChild(filhoTdDtNasc);
        filhoTr.appendChild(filhoTdSexo);
        filhoTr.appendChild(filhoTdEmail);

        objModalProcurarDiv.appendChild(filhoTr);
    }
    document.getElementById("tabelaProcurar").appendChild(objModalProcurarDiv);    
}
