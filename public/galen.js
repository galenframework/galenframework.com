
function highlightCodeBlocks() {
    $("code.block").each(function (){
        var html = $(this).html();
        var className = $(this).attr("data-language");
        $(this).html("<pre><code class=\"" + className + "\">" + html + "</code></pre>");

        if (className != null && className != "") {
            if (className == "galen-specs") {
                var codeBlock = $(this).find("pre code");
                codeBlock.html(GalenHighlight.specs(codeBlock.html()));
            }
            else if (className == "galen-suites") {
                var codeBlock = $(this).find("pre code");
                codeBlock.html(GalenHighlight.suites(codeBlock.html()));
            }
            else {
                hljs.highlightBlock($(this).find("pre code").get(0));
            }
        }
    });
}

function enrichHeadersWithLink() {
    $("h1, h2, h3, h4").each(function (){
        var _ = $(this);
        var id = _.attr("id");
        if (id != undefined && id != null && id != "") {
            _.append("<a class='paragraph-link' href='#" + escape(id) + "'>&para;</a>");
        }
    });
}

function enrichCodeBlocksWithMaximizeButton() {
    $("code.block").each(function () {
        $(this).append("<a class='enlarge' href='#'><i class='fa fa-eye'></i></a>");
    });

    $("code.block a.enlarge").click(function (){
        var html = $(this).parent().find("pre").html();
        var w = window.open();
        $(w.document.body).html("<pre>" + html + "</pre>");

        return false;
    });
}

$(function(){
    highlightCodeBlocks();
    enrichHeadersWithLink();
    enrichCodeBlocksWithMaximizeButton();
});



