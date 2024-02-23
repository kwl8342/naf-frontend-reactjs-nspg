export const getOrCreateTooltip = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div');

    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.classList.add('chart-tooltip-container');
        tooltipEl.style.minWidth = '110px';

        const table = document.createElement('table');
        table.style.margin = '0px';

        tooltipEl.appendChild(table);
        chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
};

export const externalTooltipHandlerForScore = (context) => {
    // Tooltip Element
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
    }

    // Set Text
    if (tooltip.body) {
        const titleLines = tooltip.title || [];
        const bodyLines = tooltip.body.map((b) => b.lines);

        const tableHead = document.createElement('thead');

        titleLines.forEach((title) => {
            const tr1 = document.createElement('tr');
            const tr2 = document.createElement('tr');
            tr1.style.borderWidth = 0;
            tr2.style.borderWidth = 0;

            const th1 = document.createElement('th');
            th1.style.borderWidth = 0;
            th1.style.fontSize = '17px';
            th1.setAttribute('colspan', '3');
            th1.classList.add('text-nowrap');
            th1.classList.add('text-center');
            th1.style.fontFamily = "'MDLZ BITE TYPE', 'Nunito', 'sans-serif'";

            const th2 = document.createElement('th');
            th2.style.borderWidth = 0;
            th2.style.fontSize = '15px';
            th2.setAttribute('colspan', '3');
            th2.classList.add('text-nowrap');
            th2.classList.add('text-center');
            th2.style.fontFamily = "'MDLZ BITE TYPE', 'Nunito', 'sans-serif'";

            if (title.includes(':')) {
                let arr = title.split(':');
                th1.appendChild(document.createTextNode(`${arr[0]}`));
                th2.appendChild(document.createTextNode(`${arr[1]}`));
                tr1.appendChild(th1);
                tr2.appendChild(th2);
                tableHead.appendChild(tr1);
                tableHead.appendChild(tr2);
            } else {
                const text = document.createTextNode(title);
                th1.appendChild(text);
                tr1.appendChild(th1);
                tableHead.appendChild(tr1);
            }
        });

        const tableBody = document.createElement('tbody');
        bodyLines.forEach((body, i) => {
            const colors = tooltip.labelColors[i];

            const span = document.createElement('span');
            span.style.background = colors.backgroundColor;
            span.style.borderColor = colors.borderColor;
            span.style.borderWidth = '2px';
            span.style.marginRight = '10px';
            span.style.height = '12px';
            span.style.width = '12px';
            span.style.display = 'inline-block';

            const tr = document.createElement('tr');
            tr.style.backgroundColor = 'inherit';
            tr.style.borderWidth = 0;
            tr.style.lineHeight = '1.3rem';

            const td = document.createElement('td');
            td.style.borderWidth = 0;
            const td1 = document.createElement('td');
            td1.style.borderWidth = 0;
            td1.classList.add('text-left');
            td1.classList.add('text-nowrap');
            const td2 = document.createElement('td');
            td2.style.borderWidth = 0;
            td2.classList.add('text-right');
            td2.classList.add('text-nowrap');

            let array = body[0].split(':');
            const text1 = document.createTextNode(array[0]);
            const s = document.createElement('span');
            s.style.fontWeight = '600';
            s.textContent = ` : ${parseFloat(array[1]).toFixed(2)}`;

            td.appendChild(span);
            td1.appendChild(text1);
            td2.appendChild(s);
            tr.appendChild(td);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tableBody.appendChild(tr);
        });

        const tableRoot = tooltipEl.querySelector('table');

        // Remove old children
        while (tableRoot.firstChild) {
            tableRoot.firstChild.remove();
        }

        // Add new children
        tableRoot.appendChild(tableHead);
        tableRoot.appendChild(tableBody);
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 0.9;
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.transition = 'all .1s ease';
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 5 + 'px';
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};