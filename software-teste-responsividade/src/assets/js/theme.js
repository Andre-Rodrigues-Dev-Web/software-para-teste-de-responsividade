//load url
const exibirSite = () => {
    var url = document.getElementById('urlInput').value;
    if (!url) {
        alert('Por favor, insira uma URL válida.');
        return;
    }
    document.getElementById('siteFrame').src = url;
}

// Adiciona evento para inspecionar elementos dentro do iframe ao clicar com o botão direito
document.getElementById('siteFrame').contentWindow.document.addEventListener('contextmenu', function(event) {
    event.preventDefault();

    var target = event.target;
    var inspectedContent = document.getElementById('inspectedContent');
    inspectedContent.textContent = target.outerHTML;
    
    document.getElementById('containerInput').style.display = 'flex';
});