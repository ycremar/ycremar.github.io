(function () {
  document.addEventListener('DOMContentLoaded', function () {
    initAgentThink();
  });

  function initAgentThink() {
    var stepsEl    = document.getElementById('think-steps');
    var thinkBlock = document.getElementById('think-research');
    var interests  = document.getElementById('research-interests');
    if (!stepsEl || !thinkBlock || !interests) return;

    var spin = ['⠋','⠙','⠹','⠸','⠼','⠴','⠦','⠧','⠇','⠏'];

    var steps = [
      {
        text: 'Fetching publications from Google Scholar',
        ms: 1700,
        pubs: [
          'Agent A/B: Automated A/B Testing with LLM Agents (CHI 2026)',
          'The World Won\'t Stay Still: Programmable Evolution for Agent Benchmarks (2026)',
          'SimRAG: Self-Improving RAG for Specialized Domains (NAACL 2025)',
          'Reasoning with Graphs: Structuring Implicit Knowledge for LLMs (ACL 2025)',
        ]
      },
      { text: 'Reading LinkedIn profile', ms: 600 },
      { text: 'Summarizing interests',    ms: 450 },
    ];

    var stepIdx = 0;
    var startTime;

    function runStep() {
      if (stepIdx >= steps.length) { finalize(); return; }

      var step = steps[stepIdx];
      var row  = document.createElement('div');
      row.className = 'agent-step';

      var icon = document.createElement('span');
      icon.className = 'step-icon';
      icon.textContent = spin[0];

      var txt = document.createElement('span');
      txt.className = 'step-text';
      txt.textContent = step.text;

      row.appendChild(icon);
      row.appendChild(txt);
      stepsEl.appendChild(row);

      // Reveal publications one-by-one during the spinner
      if (step.pubs) {
        step.pubs.forEach(function (pub, idx) {
          setTimeout(function () {
            var pubRow = document.createElement('div');
            pubRow.className = 'agent-step agent-pub';
            pubRow.innerHTML = '<span class="pub-bullet">·</span>'
                             + '<span class="step-text pub-text">' + pub + '</span>';
            stepsEl.appendChild(pubRow);
          }, 280 + idx * 330);
        });
      }

      var f = 0;
      var timer = setInterval(function () { icon.textContent = spin[f++ % spin.length]; }, 80);

      setTimeout(function () {
        clearInterval(timer);
        icon.textContent = '✓';
        icon.className = 'step-icon done';
        txt.style.opacity = '0.45';
        stepIdx++;
        setTimeout(runStep, 100);
      }, step.ms);
    }

    function finalize() {
      var elapsed = Math.round((Date.now() - startTime) / 1000);

      var done = document.createElement('div');
      done.className = 'agent-step';
      done.innerHTML = '<span class="step-icon done">✓</span>'
                     + '<span class="step-text final-text">Done.</span>';
      stepsEl.appendChild(done);

      setTimeout(function () {
        // Collapse and relabel to Claude-style "thought for Xs"
        thinkBlock.removeAttribute('open');
        thinkBlock.classList.add('done-thinking');
        var summary = thinkBlock.querySelector('summary');
        if (summary) summary.textContent = 'thought for ' + elapsed + 's';

        // Reveal research interests
        interests.style.display = 'block';
        void interests.offsetWidth;
        interests.classList.add('visible');
      }, 700);
    }

    setTimeout(function () {
      startTime = Date.now();
      runStep();
    }, 200);
  }

})();
