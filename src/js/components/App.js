import m from 'mithril';

const progressBarClasses = [
    'bg-success',
    'bg-info',
    'bg-warning',
    'bg-danger',
];

export default{
    oninit(vnode) {
        vnode.state.usages = [
            {
                title: 'Toilettes',
                rate: 10,
                total: 0,
            },
            {
                title: 'Vaisselle',
                rate: 20,
                total: 3,
            },
        ];

        vnode.state.newUsage = {
            title: '',
            rate: 10,
        };
    },
    view(vnode) {
        let total = 0;

        vnode.state.usages.forEach(usage => {
            console.log(usage.rate * usage.total);
            total += (usage.rate * usage.total);
        });

        let progressBarStyleIndex = 0;

        return [
            m('header.mb-3', [
                m('nav.navbar.navbar-expand-lg.navbar-dark.bg-dark', m('.container', [
                    m('span.navbar-brand', [m('span.fa.fa-tint'), ' My Water Usage']),
                    m('button.navbar-toggler[type=button][data-toggle=collapse][data-target=#navbar][aria-controls=navbar][aria-expanded=false][aria-label=Toggle navigation]', m('span.navbar-toggler-icon')),
                    m('#navbar.collapse.navbar-collapse', [
                        m('ul.navbar-nav.ml-auto', [
                            m('li.nav-item', m('a.nav-link[href=#]', 'Learn more')),
                        ]),
                    ]),
                ])),
            ]),
            m('.container', [
                m('p.text-center.text-success', 'Total: ' + total + ' liters'),
                m('.progress.mb-3', {
                    style: {
                        height: '4em',
                    },
                }, vnode.state.usages.map(
                    usage => {
                        const usageTotal = usage.rate * usage.total;

                        if (!usageTotal) {
                            return null;
                        }

                        return m('.progress-bar', {
                            className: progressBarClasses[progressBarStyleIndex++ % progressBarClasses.length],
                            style: {
                                width: ((usageTotal / total) * 100) + '%',
                            },
                        }, usage.title);
                    }
                )),
                m('.list-group', vnode.state.usages.map(
                    usage => m('.list-group-item', [
                        m('.form-group', [
                            m('input[type=text].form-control', {
                                value: usage.title,
                                oninput: m.withAttr('value', value => {
                                    usage.title = value;
                                }),
                            }),
                        ]),
                        m('.row', [
                            m('.col-9', [
                                m('.form-group', [
                                    m('input[type=number].form-control', {
                                        value: usage.rate,
                                        onchange: m.withAttr('value', value => {
                                            usage.rate = parseInt(value);
                                        }),
                                    }),
                                ]),
                            ]),
                            m('.col-3', 'liter'),
                        ]),
                        m('.form-group', [
                            m('input[type=number].form-control', {
                                value: usage.total,
                                onchange: m.withAttr('value', value => {
                                    usage.total = parseInt(value);
                                }),
                            }),
                        ]),
                    ])
                )),
                m('.card.mt-3', m('.card-body', [
                    m('h2', 'New usage type'),
                    m('.form-group', [
                        m('label[for=new-usage-title]', 'Name'),
                        m('input[type=text]#new-usage-title.form-control', {
                            value: vnode.state.newUsage.title,
                            oninput: m.withAttr('value', value => {
                                vnode.state.newUsage.title = value;
                            }),
                        }),
                    ]),
                    m('.form-group', [
                        m('label[for=new-usage-title]', 'Consumption (liter per usage)'),
                        m('input[type=number]#new-usage-title.form-control', {
                            value: vnode.state.newUsage.rate,
                            oninput: m.withAttr('value', value => {
                                vnode.state.newUsage.rate = parseInt(value);
                            }),
                        }),
                    ]),
                    m('.btn.btn-block.btn-primary', {
                        onclick() {
                            vnode.state.usages.push({
                                title: vnode.state.newUsage.title,
                                rate: vnode.state.newUsage.rate,
                                total: 0,
                            });

                            vnode.state.newUsage = {
                                title: '',
                                rate: 10,
                            };
                        },
                    }, 'Add usage'),
                ])),
            ]),
        ];
    },
}
