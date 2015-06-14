

var GalenHighlightV1 = GalenHighlightV1 || {
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
            if (GalenHighlightV1.startsWith(line, "#")) {
                return "<span class='galen-comment'>" + line + "</span>";
            }
            else if (GalenHighlightV1.startsWith(line, "@") || GalenHighlightV1.containsOnly(line, "-")){
                return "<span class='galen-tag'>" + line + "</span>";
            }
            return line.replace(/\$\{(.*?)\}/gi, "<span class='galen-tag'>${$1}</span>");
        });
    },
    specs: function (html) {
        var SIMPLE = 0;
        var OBJECT_DEF = 1;
        var lines = html.split("\n");
        
        var state = SIMPLE;

        return this.processLines(lines, function (line) {
            if (GalenHighlightV1.startsWith(line, "#")) {
                return "<span class='galen-comment'>" + line + "</span>";
            }

            if (GalenHighlightV1.containsOnly(line, "=")) {
                if (state == OBJECT_DEF) {
                    state = SIMPLE;
                }
                else {
                    state = OBJECT_DEF;
                }
                return "<span class='galen-object-def'>" + line + "</span>";
            }

            if (state == OBJECT_DEF) {
                return "<span class='galen-object-def'>" + line + "</span>";
            }
            else {
                if (GalenHighlightV1.startsWith(line, "@") || GalenHighlightV1.containsOnly(line, "-")){
                    return "<span class='galen-tag'>" + line + "</span>";
                }
                else if (GalenHighlightV1.startsWith(line, "  ")){
                    var colonIndex = line.indexOf(":");
                    if (colonIndex > 0) {
                        return "<span class='galen-spec'>" + line.slice(0, colonIndex) + "</span>" + line.slice(colonIndex);
                    }
                    else {
                        return "<span class='galen-spec'>" + line + "</span>";
                    }
                }
                else if (GalenHighlightV1.startsWith(line, "[")) {
                    return "<span class='galen-template'>" + line + "</span>";
                }
                else {
                    return "<span class='galen-object'>" + line + "</span>";
                }
            }

            return line;
        })

    }
};
