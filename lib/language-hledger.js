'use babel';

import LanguageHledgerView from './language-hledger-view';
import { CompositeDisposable } from 'atom';

export default {

  languageHledgerView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageHledgerView = new LanguageHledgerView(state.languageHledgerViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageHledgerView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-hledger:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageHledgerView.destroy();
  },

  serialize() {
    return {
      languageHledgerViewState: this.languageHledgerView.serialize()
    };
  },

  toggle() {
    console.log('LanguageHledger was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
