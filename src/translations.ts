const _trans = {
    week: {
        day: {
            fi: ['maanantai','tiistai','keskiviikko','torstai','perjantai','lauantai','sunnuntai'],
            en: ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']
        },
        month: {
            fi: ['tammikuuta','helmikuuta','maaliskuuta','huhtikuuta','toukokuuta','kesäkuuta','heinäkuuta',
            'elokuuta','syyskuuta','lokakuuta','marraskuuta','joulukuuta'],
            en: ['of january','of february','of march','of april','of may','of june','of july','of august',
            'of september','of october','of november','of december']
        }
    },
    foods: {
        total: {
            fi: 'yhteensä',
            en: 'total'
        },
        no_name: {
            fi: 'nimetön',
            en: 'nameless'
        },
        name: {
            fi: 'ruoka',
            en: 'food'
        },
        calories: {
            fi: 'kalorit',
            en: 'calories'
        },
        serving: {
            fi: 'annos',
            en: 'serving'
        },
        protein: {
            fi: 'proteiini',
            en: 'protein'
        },
        fats: {
            fi: 'rasvat',
            en: 'fats'
        },
        carbs: {
            fi: 'hiilihydr.',
            en: 'carbs'
        },
        unselected: {
            label: {
                fi: 'lisää ruoka',
                en: 'add food'
            }
        }
    }
}

const travel = (path, tree) => {
    const [head, ...tail] = path;
    if(tail.length != 0) {
        if(tree[head]) {
            return travel(tail, tree[head]);
        } else {
            return null;
        }
    } else {
        return tree[head];
    }
};

export const text = (lang) => (key) => {
    const path = [...key.split("."), lang];
    const translation = travel(path, _trans);
    if(translation) {
        return translation;
    } else {
        console.log('key not found : ' + path);
        return '--';
    }
};

