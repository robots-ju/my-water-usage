import m from 'mithril';

export default {
    oninit(vnode) {
        vnode.state.edit = false;
    },
    view(vnode) {
        const usage = vnode.attrs.usage;
        const usageIndex = vnode.attrs.usageIndex;

        if (vnode.state.edit) {
            return [
                m('button.btn.btn-block.btn-sm.btn-secondary', {
                    onclick() {
                        vnode.state.edit = false;
                    },
                }, 'Done editing'),
                m('button.btn.btn-block.btn-sm.btn-danger', {
                    onclick() {
                        vnode.attrs.ondelete();
                    },
                }, 'Delete this usage type'),
                m('.form-group', [
                    m('label', {
                        for: 'edit-usage-title-' + usageIndex,
                    }, 'Name'),
                    m('input[type=text].form-control', {
                        id: 'edit-usage-title-' + usageIndex,
                        value: usage.title,
                        oninput: m.withAttr('value', value => {
                            usage.title = value;

                            vnode.attrs.onchange();
                        }),
                    }),
                ]),
                m('.form-group', [
                    m('label', {
                        for: 'edit-usage-rate-' + usageIndex,
                    }, 'Consumption (liter per usage)'),
                    m('input[type=number]#.form-control', {
                        id: 'edit-usage-rate-' + usageIndex,
                        value: usage.rate,
                        oninput: m.withAttr('value', value => {
                            usage.rate = parseInt(value);

                            vnode.attrs.onchange();
                        }),
                    }),
                ]),
            ];
        }

        return m('.form-group', {
            onclick() {
                vnode.state.edit = true;
            },
        }, m('.row', [
            m('.col-6', [
                usage.title + ' ',
                m('span.fa.fa-pencil.text-muted'),
            ]),
            m('.col-6', [
                usage.rate + ' l/usage ',
                m('span.fa.fa-pencil.text-muted'),
            ]),
        ]));
    },
}
