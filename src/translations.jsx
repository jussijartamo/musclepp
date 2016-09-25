
const translations = {
	"week.days": {
		fi: ["ma","ti","ke","to","pe","la","su"],
		en: ["mon","tue","wed","thu","fri","sat","sun"]
	},
	"months": {
		fi: ["tammikuu","helmikuu","maaliskuu","huhtikuu","toukokuu","kes�kuu","hein�kuu","elokuu","syyskuu","lokakuu","marraskuu","joulukuu"],
		en: ["january","february","march","abril","may","june","july","august","september","october","november","december"]
	},
	"show.kg.checkbox": {
        fi: "kilot",
        en: "weight"
	},
	"show.kcal.checkbox": {
        fi: "kalorit",
        en: "calories"
    },
    "day.form.close": {
        fi: "sulje",
        en: "close"
    },
    "day.form.weight": {
        fi: "päivän paino (valinnainen)",
        en: "weight of the day (optional)"
    },
    "day.form.weight.unit" : {
        fi: "kg",
        en: "kg"
    },
    "day.form.weight.placeholder": {
        fi: "",
        en: ""
    },
    "day.form.search" : {
        fi: "etsi ravintoaine",
        en: "search food ingredient"
    },
     "day.form.search.add" : {
         fi: "Lisää ravintoaine",
         en: "Add ingredient"
     },
     "add.food.form.header" : {
        fi: "lisää ravintoaine",
         en: "add ingredient"
     },
    "add.food.form.name" : {
      fi: "nimi (pakollinen)",
       en: "name (mandatory)"
    },
    "add.food.form.serving": {
     fi: "annoksen koko (vakio)",
      en: "serving size (default)"
   },
    "add.food.form.serving.placeholder": {
     fi: "100",
      en: "100"
   },
   "add.food.form.protein": {
        fi: "proteiini",
        en: "protein"
  },
  "add.food.form.protein.placeholder": {
          fi: "0",
          en: "0"
    },
    "add.food.form.carbs": {
    fi: "hiilihydraatit",
    en: "carbs"
    },
    "add.food.form.carbs.placeholder": {
    fi: "0",
    en: "0"
    },
     "add.food.form.fats": {
     fi: "rasvat",
     en: "fats"
     },
     "add.food.form.fats.placeholder": {
     fi: "0",
     en: "0"
     },
   "add.food.form.submit": {
   fi: "lisää",
   en: "submit"
   },
   "add.food.form.cancel": {
      fi: "peruuta",
      en: "cancel"
      },
  "add.food.form.unit": {
     fi: "g",
     en: "g"
     }
}

const localeHandler = (lang) => (key) => translations[key][lang];

export default localeHandler;
