(() => {
    
    function _(x) { return document.querySelector(x); }

    const search = _('.search'),
          matchList = _('.match-list'),
          searchStates = async (e) => {

              const response = await fetch('../data/states.json'),
                    states = await response.json();
              
              let seachText = e.target.value,
                  matches = states.filter(state => {
                      const regex = new RegExp(`^${seachText}`, 'gi');
                      return state.name.match(regex) || state.abbr.match(regex);
                  });

              if (seachText.length === 0) {
                  matches = [];
                  matchList.innerHTML = "";
              }

              renderOutput(matches);

          },
          renderOutput = matches => {

              if(matches.length > 0) {

                  const html = matches.map( match => `
                            <div class="card card-body mb1">
                                <h4>
                                    ${match.name} (${match.abbr}) 
                                    <span class="text-primary">${match.capital}</span>
                                </h4>
                                <small>Lat: ${match.lat} / Lon: ${match.long}</small>
                            </div>
                        `).join('');

                  matchList.innerHTML = html;
                  
              }

          };

    search.addEventListener('input', searchStates, false);
    search.focus();

})();
