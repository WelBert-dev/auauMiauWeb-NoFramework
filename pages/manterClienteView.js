
class Moradia

{   
    pais; // pais
    estado; // estado
    logradouro; // logradouro
    bairro; // bairro1
    endereco; // endereco 
    cep; // cep
    
    get getPais() {
        return pais;
    }
    setPais(pais) {
        this.pais = pais;
    }
    get getEstado() {
        return estado;
    }
    setEstado(estado) {
        this.estado = estado;
    }
    get getLogradouro() {
        return logradouro;
    }
    setLogradouro(logradouro) {
        this.logradouro = logradouro;
    }
    get getBairro() {
        return bairro;
    }
    setBairro(bairro) {
        this.bairro = bairro;
    }
    get getEndereco() {
        return endereco;
    }
    setEndereco(endereco) {
        this.endereco = endereco;
    }
    get getCep() {
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


    get getCpf() {
        return cpf;
    }
    setCpf(cpf) {
        this.cpf = cpf;
    }
    get getNome() {
        return nome;
    }
    setNome(nome) {
        this.nome = nome;
    }
    get getDtNasc() {
        return dtNasc;
    }
    setDtNasc(dtNasc) {
        this.dtNasc = dtNasc;
    }
    get getDtReg() {
        return this.dtReg;
    }
    setDtReg(dtReg) {
        this.dtReg = dtReg;
    }
    get getTelCont1() {
        return telCont1;
    }
    setTelCont1(telCont1) {
        this.telCont1 = telCont1;
    }
    get getTelCont2() {
        return telCont2;
    }
    setTelCont2(telCont2) {
        this.telCont2 = telCont2;
    }
    get getEmail() {
        return email;
    }
    setEmail(email) {
        this.email = email;
    }
    setSexo(sexo)
    {
        this.sexo = sexo;
    }
    get getSexo()
    {
        return sexo;
    }
    setMoradia(moradia)
    {
        this.moradia = moradia;
    }
    get getMoradia()
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
            var texto  = document.createTextNode("ERRO!! ;-;");
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

        moradia.setPais(document.getElementById("cb_pais").options[document.getElementById("cb_pais").selectedIndex].value);
        moradia.setEstado(document.getElementById("cb_estado").options[document.getElementById("cb_estado").selectedIndex].value);
        moradia.setLogradouro(document.getElementById("cb_cidade").options[document.getElementById("cb_cidade").selectedIndex].value);
        moradia.setBairro(document.getElementById("bairroInput").value);
        moradia.setEndereco(document.getElementById("enderecoInput").value);
        moradia.setCep(document.getElementById("cepInput").value);

        cliente.setMoradia(moradia);

        createClient(cliente);
        console.log(readClient());

        var filho = window.document.createElement("h1")
        filho.setAttribute("id", "h1SucessResult");
        var texto  = document.createTextNode("SUCESSO! ;D");
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
            var texto  = document.createTextNode("ERRO!! ;-;");
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
        var texto  = document.createTextNode("SUCESSO! ;D");
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
        var texto  = document.createTextNode("ERRO!! ;-;");
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
            var texto  = document.createTextNode("ERRO!! ;-;");
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
        var texto  = document.createTextNode("SUCESSO! ;D");
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
    document.getElementById("dtNascInput").value = new Date().toJSON().slice(0,10);
    document.getElementById("dtReg").value = new Date().toJSON().slice(0,10);
    document.getElementById("RSM").checked = true; 
    document.getElementById("telCont1Input").value = ''; 
    document.getElementById("telCont2Input").value = ''; 
    document.getElementById("emailInput").value = ''; 
 
    document.getElementById("cb_pais").getElementsByTagName('option')[0].selected = true;
    document.getElementById("cb_estado").getElementsByTagName('option')[0].selected = true;
    document.getElementById("cb_cidade").getElementsByTagName('option')[0].selected = true;

    document.getElementById("bairroInput").value = ''; 
    document.getElementById("enderecoInput").value = ''; 
    document.getElementById("cepInput").value = ''; 
     
}

async function handleBtnProcurarNomeClick()
{
    try 
    {
        var objInputNome = document.getElementById("nomeInput");
        var listaClientes = readClient(); 

        if (listaClientes.length == 0)
        {   // nenhum cliente foi registrado ainda!

            window.alert("Nenhum cliente foi adicionado ainda! ;-;");

            if (document.getElementById("tBodyModalProcurar") !== null) 
            {
                document.getElementById("tBodyModalProcurar").outerHTML = "";
            }            

            if (document.getElementById("btnProcurarNome").getAttribute("data-target") !== undefined)
            {
                document.getElementById("btnProcurarNome").removeAttribute("data-target");
                console.log("Removeu o atributo data-target");
            }
            return;
        }
        else if (String(objInputNome.value).replace(/ /g, "") === "")
        { // Retorna all clientes em janela modal

            atualizaTabelaModal(listaClientes);
            document.getElementById("btnProcurarNome").setAttribute("data-target", "#modalProcurar");
        }
        else 
        { // Consulta um cliente com o nome

            var listaClientesPeloNome = listaClientes.filter(x => x.nome === String(objInputNome.value).replace(/ /g, ""));
            if (!(listaClientesPeloNome.length == 0)) 
            { // cliente não existe registro
                
                console.log("entrou no ultimo else");

                atualizaTabelaModal(listaClientesPeloNome);
                document.getElementById("btnProcurarNome").setAttribute("data-target", "#modalProcurar");             
            }
            else
            {
                document.getElementById("nomeInput").style.borderColor = '#F00';
                await sleep(5000);
                document.getElementById("nomeInput").style.borderColor = '#FFF';
            }
        }
    }
    catch (ex) 
    {
        console.log(ex);
    }
}

async function handleBtnProcurarCPFClick()
{
    try 
    {
        var objInputCpf = document.getElementById("cpfInput");
        var listaClientes = readClient(); 

        if (listaClientes.length === 0)
        {   // nenhum cliente foi registrado ainda!

            window.alert("Nenhum cliente foi adicionado ainda! ;-;");

            if (document.getElementById("tBodyModalProcurar") !== null) 
            {
                document.getElementById("tBodyModalProcurar").outerHTML = "";
            }            

            if (document.getElementById("btnProcurarCPF").getAttribute("data-target") !== undefined)
            {
                document.getElementById("btnProcurarCPF").removeAttribute("data-target");
                console.log("Removeu o atributo data-target");
            }

            return;
        }
        else if (String(objInputCpf.value).replace(/ /g, "") === "")
        { // Retorna all clientes em janela modal

            atualizaTabelaModal(listaClientes);
            document.getElementById("btnProcurarCPF").setAttribute("data-target", "#modalProcurar");
        }
        else 
        { // Consulta um cliente com o cpf

            var listaClientesPeloCPF = listaClientes.filter(x => x.cpf === String(objInputCpf.value).replace(/ /g, ""));
            
            if (!(listaClientesPeloCPF.length == 0)) 
            { // cliente não existe registro
                
                console.log("entrou no ultimo else");

                atualizaTabelaModal(listaClientesPeloCPF);
                document.getElementById("btnProcurarCPF").setAttribute("data-target", "#modalProcurar");             
            }
            else
            {
                document.getElementById("cpfInput").style.borderColor = '#F00';
                await sleep(5000);
                document.getElementById("cpfInput").style.borderColor = '#FFF';
            }        
        }
    }
    catch (ex) 
    {
        console.log(ex);
    }
}

function atualizaTabelaModal(listaClientes)
{
    if (document.getElementById("tBodyModalProcurar") !== null) 
    {
        console.log(typeof document.getElementById("tBodyModalProcurar"))
        document.getElementById("tBodyModalProcurar").outerHTML = "";
    }

    var objModalProcurarDiv = document.createElement("tbody");
    objModalProcurarDiv.setAttribute("id", "tBodyModalProcurar");


    for (let i = 0; i < listaClientes.length; i++)
    {
        if (i % 2 == "0") 
        { // par
            if (i == 0)
            {
                var filhoTr = document.createElement("tr");
                filhoTr.setAttribute("id", "trProcurar"+(i + 1));
        
                var filhoRadio = document.createElement("input");
                filhoRadio.setAttribute("type", "radio");
                filhoRadio.setAttribute("name", "RCliente");
                filhoRadio.setAttribute("checked", true);
                filhoRadio.classList.add("-bgCian");
                filhoRadio.value =  readClient().findIndex(x => x.cpf === String(listaClientes[i].cpf));
        
                var filhoTdRadio = document.createElement("td");
                filhoTdRadio.classList.add("-bgCian");
                filhoTdRadio.appendChild(filhoRadio);
        
                var filhoTdNome = document.createElement("td");
                filhoTdNome.classList.add("-bgCian");
                filhoTdNome.appendChild(document.createTextNode(listaClientes[i].nome));
        
                var filhoTdCPF = document.createElement("td");
                filhoTdCPF.classList.add("-bgCian");
                filhoTdCPF.appendChild(document.createTextNode(listaClientes[i].cpf));
        
                var filhoTdDtNasc = document.createElement("td");
                filhoTdDtNasc.classList.add("-bgCian");
                filhoTdDtNasc.appendChild(document.createTextNode(listaClientes[i].dtNasc));
        
                var filhoTdSexo = document.createElement("td");
                filhoTdSexo.classList.add("-bgCian");
                filhoTdSexo.appendChild(document.createTextNode(listaClientes[i].sexo));
        
                var filhoTdEmail = document.createElement("td");
                filhoTdEmail.classList.add("-bgCian");
                filhoTdEmail.appendChild(document.createTextNode(listaClientes[i].email));
            }
            else
            {
                var filhoTr = document.createElement("tr");
                filhoTr.setAttribute("id", "trProcurar"+(i + 1));
        
                var filhoRadio = document.createElement("input");
                filhoRadio.setAttribute("type", "radio");
                filhoRadio.setAttribute("name", "RCliente");
                filhoRadio.classList.add("-bgCian");
                filhoRadio.value =  readClient().findIndex(x => x.cpf === String(listaClientes[i].cpf));
        
                var filhoTdRadio = document.createElement("td");
                filhoTdRadio.classList.add("-bgCian");
                filhoTdRadio.appendChild(filhoRadio);
        
                var filhoTdNome = document.createElement("td");
                filhoTdNome.classList.add("-bgCian");
                filhoTdNome.appendChild(document.createTextNode(listaClientes[i].nome));
        
                var filhoTdCPF = document.createElement("td");
                filhoTdCPF.classList.add("-bgCian");
                filhoTdCPF.appendChild(document.createTextNode(listaClientes[i].cpf));
        
                var filhoTdDtNasc = document.createElement("td");
                filhoTdDtNasc.classList.add("-bgCian");
                filhoTdDtNasc.appendChild(document.createTextNode(listaClientes[i].dtNasc));
        
                var filhoTdSexo = document.createElement("td");
                filhoTdSexo.classList.add("-bgCian");
                filhoTdSexo.appendChild(document.createTextNode(listaClientes[i].sexo));
        
                var filhoTdEmail = document.createElement("td");
                filhoTdEmail.classList.add("-bgCian");
                filhoTdEmail.appendChild(document.createTextNode(listaClientes[i].email));
            }
        }
        else 
        { // impar 007bff azul bunitu
            var filhoTr = document.createElement("tr");
            filhoTr.setAttribute("id", "trProcurar"+(i+1));
    
            var filhoRadio = document.createElement("input");
            filhoRadio.setAttribute("type", "radio");
            filhoRadio.setAttribute("name", "RCliente");
            filhoRadio.classList.add("-bgCianDark");
            filhoRadio.value =  readClient().findIndex(x => x.cpf === String(listaClientes[i].cpf));
    
            var filhoTdRadio = document.createElement("td");
            filhoTdRadio.classList.add("-bgCianDark");
            filhoTdRadio.appendChild(filhoRadio);
    
            var filhoTdNome = document.createElement("td");
            filhoTdNome.classList.add("-bgCianDark");
            filhoTdNome.appendChild(document.createTextNode(listaClientes[i].nome));
    
            var filhoTdCPF = document.createElement("td");
            filhoTdCPF.classList.add("-bgCianDark");
            filhoTdCPF.appendChild(document.createTextNode(listaClientes[i].cpf));
    
            var filhoTdDtNasc = document.createElement("td");
            filhoTdDtNasc.classList.add("-bgCianDark");
            filhoTdDtNasc.appendChild(document.createTextNode(listaClientes[i].dtNasc));
    
            var filhoTdSexo = document.createElement("td");
            filhoTdSexo.classList.add("-bgCianDark");
            filhoTdSexo.appendChild(document.createTextNode(listaClientes[i].sexo));
    
            var filhoTdEmail = document.createElement("td");
            filhoTdEmail.classList.add("-bgCianDark");
            filhoTdEmail.appendChild(document.createTextNode(listaClientes[i].email));
        }

        filhoTr.appendChild(filhoRadio);
        filhoTr.appendChild(filhoTdNome);
        filhoTr.appendChild(filhoTdCPF);
        filhoTr.appendChild(filhoTdDtNasc);
        filhoTr.appendChild(filhoTdSexo);
        filhoTr.appendChild(filhoTdEmail);

        objModalProcurarDiv.appendChild(filhoTr);
    }

    document.getElementById("tabelaProcurar").appendChild(objModalProcurarDiv);    
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function handleBtnConfirmarProcuraClick()
{
    // trProcurar1
    let indexOfCliente = document.querySelector('input[name="RCliente"]:checked').value;
    console.log(indexOfCliente);

    var cliente = new Cliente();
    cliente = readClient()[indexOfCliente];

    document.getElementById("dtReg").value = cliente.dtReg;
    document.getElementById("nomeInput").value = cliente.nome;
    document.getElementById("cpfInput").value = cliente.cpf;
    document.getElementById("dtNascInput").value = cliente.dtNasc;

    if (cliente.sexo == "M")
    {
        document.getElementById("RSM").checked = true;
    }
    else
    {
        document.getElementById("RSF").checked = true;
    }


    document.getElementById("telCont1Input").value = cliente.telCont1;
    document.getElementById("telCont2Input").value = cliente.telCont2;
    document.getElementById("emailInput").value = cliente.email;

    var objSelectPais = document.getElementById("cb_pais");
   // console.log(objSelectPais.options[objSelectPais.selectedIndex]);
    for (var i = 0; i<objSelectPais.getElementsByTagName('option').length; i++)
    {
        if (objSelectPais.getElementsByTagName('option')[i].value == cliente.moradia.pais)
        {
            objSelectPais.getElementsByTagName('option')[i].selected = true;
        }
    }

    var objSelectEstado = document.getElementById("cb_estado");
    for (var i = 0; i < objSelectEstado.getElementsByTagName('option').length; i++)
    {
        if (objSelectEstado.getElementsByTagName('option')[i].value == cliente.moradia.estado)
        {
            objSelectEstado.getElementsByTagName('option')[i].selected = true;
        }
    }

    var objSelectCidade = document.getElementById("cb_cidade");
    for (var i = 0; i < objSelectCidade.getElementsByTagName('option').length; i++)
    {
        if (objSelectCidade.getElementsByTagName('option')[i].value == cliente.moradia.logradouro)
        {
            objSelectCidade.getElementsByTagName('option')[i].selected = true;
        }
    }

    document.getElementById("bairroInput").value = cliente.moradia.bairro;
    document.getElementById("enderecoInput").value = cliente.moradia.endereco;
    document.getElementById("cepInput").value = cliente.moradia.cep;
    
}

