// Format date to DD/MM/YYYY
function formatDisplayDate(date) {
  if (!(date instanceof Date) || isNaN(date)) {
    console.warn('Invalid date provided to formatDisplayDate');
    return '';
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  
  const format = translation[currentLang].dateFormat || "DD/MM/YYYY";
  return format
    .replace('DD', day)
    .replace('MM', month)
    .replace('YYYY', year);
}

const translation = {
  en: {
    title: "Date Calculator",
    select: "Select Start Date:",
    days: "Number of Days to Add:",
    result: "Result:",
    date: "Date:",
    month: "Month:",
    year: "Year:",
    placeholder: "Enter number of days",
    calculateDate: "Calculate",
    errors: {
      fillFields: "Please fill in all fields",
      invalidDate: "Invalid date selected",
      invalidDays: "Please enter a valid number of days"
    },
    dateFormat: "DD/MM/YYYY"
  },
  ar: {
    title: "حاسبة التاريخ",
    select: "اختر تاريخ البدء:",
    days: "عدد الايام المضافة:",
    result: "نتيجة:",
    date: "التاريخ:",
    month: "الشهر:",
    year: "السنة:",
    placeholder: "ادخل عدد الايام",
    calculateDate: "حساب",
    errors: {
      fillFields: "يرجى ملء جميع الحقول",
      invalidDate: "التاريخ المحدد غير صالح",
      invalidDays: "يرجى إدخال عدد صحيح من الأيام"
    },
    dateFormat: "DD/MM/YYYY"
  }
};

const defaultLang = "en";
let currentLang = window.localStorage.getItem("lang") || defaultLang;

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
});

function setLanguage(lang) {
  if (!translation[lang]) {
    console.warn(`Language ${lang} not supported, falling back to ${defaultLang}`);
    lang = defaultLang;
  }
  
  currentLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  window.localStorage.setItem("lang", lang);
  translateTo();
}

function changeDirection() {
  const newLang = currentLang === 'en' ? 'ar' : 'en';
  setLanguage(newLang);
}

function translateTo() {
  try {
    const elements = document.querySelectorAll("[data-lang]");
    const translater = document.getElementsByClassName("lang")[0];
    
    elements.forEach((element) => {
      const key = element.getAttribute("data-lang");
      const translatedText = translation[currentLang][key];
      
      if (!translatedText) {
        console.warn(`Translation missing for key: ${key} in language: ${currentLang}`);
        return;
      }
      
      if (key === "placeholder") {
        element.placeholder = translatedText;
      } else {
        element.textContent = translatedText;
      }
    });
    
    translater.textContent = currentLang.toUpperCase();
  } catch (error) {
    console.error('Error during translation:', error);
  }
}

// Set today's date as default when page loads
window.onload = function () {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedToday = `${year}-${month}-${day}`;

  // Set the date input value (hidden)
  document.getElementById("start-date").value = formattedToday;
  // Set the display input value
  document.getElementById("date-display").value = formatDisplayDate(today);

  // Add event listener for Enter key on days input
  document
    .getElementById("days")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission
        calculateDate();
      }
    });

  // Add event listener for date changes
  document.getElementById("start-date").addEventListener("change", function () {
    const selectedDate = new Date(this.value);
    document.getElementById("date-display").value =
      formatDisplayDate(selectedDate);
  });

  // Add event listener to open calendar when clicking the display input
  document
    .getElementById("date-display")
    .addEventListener("click", function () {
      document.getElementById("start-date").showPicker();
    });
};

function calculateDate() {
  // Get input values
  const startDate = document.getElementById("start-date").value;
  const daysToAdd = parseInt(document.getElementById("days").value);

  // Validate inputs
  if (!startDate || !daysToAdd) {
    alert(translation[currentLang].errors.fillFields);
    return;
  }

  // Create date object and add days
  const resultDate = new Date(startDate);
  resultDate.setDate(resultDate.getDate() + daysToAdd);

  // Format the date in numbers (DD/MM/YYYY)
  const numericalDate = formatDisplayDate(resultDate);

  // Format the date in words
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateInWords = resultDate.toLocaleDateString("en-US", options);

  // Display results
  document.getElementById("result-date").textContent = numericalDate;
  document.getElementById("result-date-words").textContent = dateInWords;
}
