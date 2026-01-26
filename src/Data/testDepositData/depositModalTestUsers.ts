type UserCredentials = {
  email: string;
  password: string;
};

type UserTypes = {
  [type: string]: UserCredentials;
};

type Users = {
  [locale: string]: {
    location: string;
    user: UserTypes;
  };
};

export const USERS_DEPOSIT_MODAL: Users = {
  au: {
      location: 'Australia - Melbourne',
      user: {
          untrusted: {
              email: 'newAustralia@kingbilly.xyz',
              password: 'KingBilly123!',
          },
          untrustedFromAffialiates: {
              email: 'Australia_btag@Kingbilly.Xyz',
              password: 'KingBilly123!',
          },
          trusted: {
              email: 'australia_trusted3@kingbilly.xyz',
              password: 'KingBilly123!',
          },
      },
  },

  nz: {
      location: 'New Zealand',
      user: {
          untrusted: {
              email: 'newnewzealand@kingbilly.xyz',
              password: 'KingBilly123!',
          },

          untrustedFromAffialiates: {
              email: 'newzealand_btag@kingbilly.xyz',
              password: 'KingBilly123!',
          },

          trusted: {
              email: 'newzealand_trusted2@kingbilly.xyz',
              password: 'KingBilly123!',
          },

      }
  },

  ca: {
      location: 'Canada - Toronto',
      user: {
          untrusted: {
              email: 'newcanada@kingbilly.xyz',
              password: 'KingBilly123!',
          },
          untrustedFromAffialiates: {
              email: 'Canada_btag@Kingbilly.Xyz',
              password: 'KingBilly123!',
          },
          trusted: {
              email: 'canada_trusted2@kingbilly.xyz',
              password: 'KingBilly123!',
          },
      }
  },

  de: {
      location: 'Germany - Frankfurt - 3',
      user: {
          untrusted: {
              email: 'newgermany@kingbilly.xyz',
              password: 'KingBilly123!',
          },
          untrustedFromAffialiates: {
              email: 'Germany_btag@Kingbilly.Xyz',
              password: 'KingBilly123!',
          },
          trusted: {
              email: 'Germany_trusted@kingbilly.xyz',
              password: 'KingBilly123!',
          },
      }
  },

  no: {
      location: 'Norway',
      user: {
          untrusted: {
              email: 'newnorway@kingbilly.xyz',
              password: 'KingBilly123!',
          },
          untrustedFromAffialiates: {
              email: 'norway_btag@kingbilly.xyz',
              password: 'KingBilly123!',
          },
          trusted: {
              email: 'norway_trusted2.2@kingbilly.xyz',
              password: 'KingBilly123!',
          },
      }
  },

  at: {
    location: 'Austria',
    user: {
      untrusted: {
        email: 'austria_untrusted@kingbilly.xyz',
        password: 'KingBilly123!',
      },
      untrustedFromAffialiates: {
        email: 'austria_untrusted_aff@kingbilly.xyz',
        password: 'KingBilly123!',
      },
      trusted: {
        email: 'austria_trusted@kingbilly.xyz',
        password: 'KingBilly123!',
      },
    },
  },

  ch: {
    location: 'Switzerland',
    user: {
      untrusted: {
        email: 'ch_untrusted@kingbilly.xyz',
        password: 'KingBilly123!',
      },
      untrustedFromAffialiates: {
        email: 'ch_untrusted_aff@kingbilly.xyz',
        password: 'KingBilly123!',
      },
      trusted: {
        email: 'ch_trusted@kingbilly.xyz',
        password: 'KingBilly123!',
      },
    },
  },

  ie: {
    location: 'Ireland',
    user: {
      untrusted: {
        email: 'ireland_untrusted@kingbilly.xyz',
        password: 'KingBilly123!',
      },
      untrustedFromAffialiates: {
        email: 'ireland_untrusted_aff@kingbilly.xyz',
        password: 'KingBilly123!',
      },
      trusted: {
        email: 'ireland_trusted@kingbilly.xyz',
        password: 'KingBilly123!',
      },
    },
  },
};
