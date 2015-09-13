

var GalenHighlightV2 = GalenHighlightV2 || {
    processLines: function (lines, func) {
        var string = "";
        for (var i=0; i<lines.length; i++) {
           if (lines[i].length > 0) {
               string += func(lines[i]) + "\n"; 
           }
           else string += "\n";
        }
        return string;
    },
    startsWith: function (line, sequence) {
        return line.indexOf(sequence) === 0;
    },
    endsWith: function (line, sequence) {
        return line.indexOf(sequence, line.length - sequence.length) !== -1;
    },
    containsOnly: function (line, symbol) {
        if (line.length > 0 ){
            for (var i=0; i<line.length; i++) {
                if (line[i] != symbol[0]) return false;
            }
            return true;
        }
        return false;
    },
    suites: function (html) {
        var lines = html.split("\n");
        return this.processLines(lines, function (line) {
            if (GalenHighlightV2.startsWith(line, "#")) {
                return "<span class='galen-comment'>" + line + "</span>";
            }
            else if (GalenHighlightV2.startsWith(line, "@") || GalenHighlightV2.containsOnly(line, "-")){
                return "<span class='galen-tag'>" + line + "</span>";
            }
            return line.replace(/\$\{(.*?)\}/gi, "<span class='galen-tag'>${$1}</span>");
        });
    },
    specs: function (html) {
        var NORMAL = 0;
        var OBJECT_DEFINITION = 1;
        var state = NORMAL;
        var lines = html.split("\n");
        return this.processLines(lines, function (line) {
            line = line.replace(/\$\{(.*?)\}/gi, "<span class='galen-expression'>${$1}</span>");

            if (GalenHighlightV2.startsWith(line, "@objects")) {
                state = OBJECT_DEFINITION;
            }

            if (GalenHighlightV2.startsWith(line.trim(), "#")) {
                return "<span class='galen-comment'>" + line + "</span>";
            }
            if (GalenHighlightV2.startsWith(line.trim(), "=") &&
                GalenHighlightV2.endsWith(line.trim(), "=") 
            ) {
                state = NORMAL;
                return "<span class='galen-section'>" + line + "</span>";
            }

            if (GalenHighlightV2.startsWith(line.trim(), "@")) {
                return "<span class='galen-tag'>" + line + "</span>";
            }
            if (GalenHighlightV2.endsWith(line.trim(), ":")) {
                return "<span class='galen-object'>" + line + "</span>";
            }
            else if (GalenHighlightV2.startsWith(line, "  ")){
                if (state == OBJECT_DEFINITION) {
                    return line.replace(/([a-z\-\*]+)\s(.*)/gi, "<span class='galen-object'>$1</span> $2");
                } else if (GalenHighlightV2.startsWith(line.trim(), "|")){
                    return "<span class='galen-spec'>" + line + "</span>";
                } else {
                    return GalenHighlightV2.highlightIndividualSpec(line);
                }
            }

            return line;
        })

    },
    keywords: [
        "edge", "width", "height", "image", "below", "component", 
        "centered", "text", "near", "partly", "horizontally", 
        "vertically", "all", "is", "starts", "ends", "contains", 
        "matches", "uppercase", "lowercase", "inside", "on",
        "css", "aligned", "right", "left", "top", "bottom", "absent", "visible",
        "right-of", "left-of", "above", "color-scheme",
        "count", "any", "to", "frame"
    ],
    highlightIndividualSpec: function (line) {
        line = line + " ";
        line = line.replace(/(#[a-z0-9]+|[0-9]+)/gi, "<span class='galen-number'>$1</span>");

        for (var i = 0; i < this.keywords.length; i++) {
            line = line.replace(" " + this.keywords[i] + " ", " <span class='galen-spec'>" + this.keywords[i] + "</span> ");
        }

        line = line.replace(/(\".*\")/gi, "<span class='galen-note'>$1</span>");
        return line;
    }
};
