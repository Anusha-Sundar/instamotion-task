Cypress.Commands.add('selectDropdown', (selector, optionlist, selectVal) => {
    cy.get(selector).contains(optionlist, selectVal).click()
})

Cypress.Commands.add('getText', { prevSubject: 'element' }, (element, options) => {
    cy.wrap(element).invoke('text').then((text) => {
        if (text == '') {
            cy.wrap(element).invoke('val')
        }
        else {
            cy.wrap(element).invoke('text')
        }
    })
})

Cypress.Commands.add('readNumberfromScreen', (searchText, nextWord) => {
    var words = searchText.split(' ')
    let prev = words[0]
    let curr = words[1]
    let flag = false
    for (var i = 1; i < words.length; i++) {
        curr = words[i]
        if (curr === nextWord) {
            flag = true
            break
        }
        prev = curr
    }
    if (flag) {
        cy.wrap(prev).as('prev')
    }
    else {
        cy.log("The search text is not available")
    }

})

Cypress.Commands.add('forceVisit', url => {
    cy.window().then(win => {
        return win.open(url, '_self');
    });
});

Cypress.Commands.add('wildCardSubstitution', (wildcardSelector, toReplace, aslabel) => {

    var word = []
    var labelCase = []
    for (var i = 0; i < aslabel.length; i++) {
        labelCase[i] = aslabel[i].toLowerCase()
        var temp = wildcardSelector.replace(new RegExp(toReplace, 'g'), labelCase[i])
        word.push(temp)
    }
    return word;
});

Cypress.Commands.add('acceptCookies', (selector1, selector2) => {
    cy.get(selector1).click()
    cy.get(selector2).click()
    cy.wait(1000)
});

Cypress.Commands.add('getLinks', { prevSubject: 'optional' }, (subject, search) => {
    if (subject) {
        cy.wrap(subject).then(($el) => {
            cy.wrap($el).find(search)
        })
    }
    else {
        cy.get(search)
    }
})

Cypress.Commands.add('getByLabel', (label, idval) => {
    cy.contains('label', label)
        .invoke('attr', idval)
        .then((id) => {
            cy.wrap(id).as('id')
        })
})

Cypress.Commands.add('typeText', (selector, TypeVal) => {
    cy.get(selector).should('be.enabled').and('be.empty')
        .click().should('be.focused').type(TypeVal)
})

Cypress.Commands.add('replaceStr', (str, toReplace, replaceInto) => {
    var temp = str.replace(new RegExp(toReplace, 'g'), replaceInto)
    cy.wrap(temp).as('text')
})

Cypress.Commands.add('printArray', (arrayName) => {
    for (var i = 0; i < arrayName.length; i++) {
        cy.log("Elements in array are:  " + arrayName[i])
    }
})

Cypress.Commands.add('splitArray', (str, splitPattern) => {
    var temp = str.split(splitPattern);
    cy.wrap(temp).as('list')
})

