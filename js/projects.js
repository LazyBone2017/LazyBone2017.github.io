const authorList = [
    ["Jonas Schröter", "https://LazyBone2017.github.io"]
];

const langList = [
    ["Java", "badge-warning"],
    ["JavaScript", "badge-warning"],
    ["HTML", "badge-danger"],
    ["CSS", "badge-primary"]
];

function createProject(title, text, authors, langs, website) {
    var card = $("<div></div>").attr("class", "card projects-card");

    //Title
    var cardTitle = $("<h5></h5>").attr("class", "card-title");
    cardTitle.html(title);
    card.append(cardTitle);

    //Text
    var cardText = $("<p></p>").attr("class", "card-text");
    cardText.html(text);
    card.append(cardText);

    //Authors
    var cardAuthors = $("<p></p>").attr("class", "card-text");
    cardAuthors.html("Authors: ");
    for (var i = 0; i < authors.length; i++) {
        var authorLink = $("<a></a>").html(authors[i]);
        for (var j = 0; j < authorList.length; j++) {
            if (authorList[j][0] == authors[i]) {
                authorLink.attr("href", authorList[j][1]);
                break;
            }
        }
        if (i > 0) cardAuthors.append(", ");
        cardAuthors.append(authorLink);
    }
    card.append(cardAuthors);

    //Languages
    var cardLangs = $("<p></p>");
    for (var i = 0; i < langs.length; i++) {
        var langBadge = $("<span></span>").html(langs[i]);
        for (var j = 0; j < langList.length; j++) {
            if (langList[j][0] == langs[i]) {
                langBadge.attr("class", "badge " + langList[j][1]);
                break;
            }
        }
        if (i > 0) cardLangs.append(" ");
        cardLangs.append(langBadge);
    }
    card.append(cardLangs);

    //Buttons
    var cardButtons = $("<div></div>").attr("class", "btn-group");
    cardButtons.append($("<a></a>").html("Code").attr("class", "btn btn-primary").attr("href", "https://github.com/Birdy2014/" + title));
    if (website) cardButtons.append($("<a></a>").html("Website").attr("class", "btn btn-primary").attr("href", "https://birdy2014.github.io/" + title));
    card.append(cardButtons);

    $("#projects-container").append(card);
}

function makeProjectsFromJSON(data) {
    var jsonArray = JSON.parse(data);

    for (var i = 0; i < jsonArray.length; i++) {
        createProject(jsonArray[i][0], jsonArray[i][1], jsonArray[i][2], jsonArray[i][3], jsonArray[i][4]);
    }
}

function getProjectsFromServer(filePath) {
    $.ajax({
        url: filePath,
        dataType: "text",
        success: function (data) {
            makeProjectsFromJSON(data);
        },
    });
}