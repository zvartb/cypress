function getAllUrls(baseUrl, pattern) {
  cy.visit(baseUrl).then(() => {
    let links = {};
    cy.get('a[href*="/"]:not([href=""])')
        .each((el) => {
          let currentUrl = el.prop('href');
          if (currentUrl.includes(pattern)) {
            links[currentUrl] = 'unvisited';
          }
        })
        .then(() => {
          for (let el in links) {
            if (links[el] === 'unvisited') {
              cy.visit(el).then(() => {
                cy.get('a[href*="/"]:not([href=""])').each((el) => {
                  if (!links[el]) {
                    let currentUrl = el.prop('href');
                    if (currentUrl.includes(pattern)) {
                      links[currentUrl] = 'unvisited';
                    }
                  }
                });
              });
            }
          }
        });
  });
}

describe('visitAllUrlsInWebsite', () => {
  it('visitAllUrlsInWebsite', () => {
    getAllUrls('https://scalefront.com/', 'https://scalefront.com');
  });
});
