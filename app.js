const INSTAGRAM_URL = "https://www.instagram.com/solaris.dance/";

const GOOGLE_APPOINTMENT_SCHEDULES = {
  private1hr: "",
  private2hr: "",
  private3hr: "",
  choreography: "",
  cleaning1hr: "",
};

const lessonData = {
  private1hr: {
    label: "1 hr Private Lesson",
    duration: "1 hour",
    price: 20,
    deposit: 10,
    actionLabel: "Book & Pay Deposit",
  },
  private2hr: {
    label: "2 hr Private Lesson",
    duration: "2 hours",
    price: 40,
    deposit: 10,
    actionLabel: "Book & Pay Deposit",
  },
  private3hr: {
    label: "3 hr Private Lesson",
    duration: "3 hours",
    price: 60,
    deposit: 10,
    actionLabel: "Book & Pay Deposit",
  },
  choreography: {
    label: "Choreography",
    duration: "Varies by project",
    deposit: null,
    depositLabel: "DM to book",
    balanceLabel: "Confirmed after details",
    totalLabel: "Custom quote",
    actionLabel: "DM on Instagram",
  },
  cleaning1hr: {
    label: "Choreography Cleaning Session",
    duration: "1 hour",
    price: 20,
    deposit: 10,
    actionLabel: "Book & Pay Deposit",
  },
};

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const lessonSelect = document.querySelector("#lesson-type");
const lessonCards = document.querySelectorAll("[data-select-lesson]");
const bookingTriggers = document.querySelectorAll("[data-booking-trigger]");
const bookingModal = document.querySelector("[data-booking-modal]");
const bookingFrame = document.querySelector("[data-booking-frame]");
const inlineBookingFrame = document.querySelector("[data-inline-booking-frame]");
const inlineSetupPanel = document.querySelector("[data-inline-setup]");
const setupPanel = document.querySelector("[data-setup-panel]");
const modalSubtitle = document.querySelector("[data-modal-subtitle]");
const closeButtons = document.querySelectorAll("[data-close-modal]");
const depositOutput = document.querySelector("[data-deposit]");
const balanceOutput = document.querySelector("[data-balance]");
const totalOutput = document.querySelector("[data-total]");
const payButton = document.querySelector(".pay-button");

function updateLesson(value) {
  const lesson = lessonData[value] || lessonData.private1hr;
  const hasFixedPrice = Number.isFinite(lesson.price) && Number.isFinite(lesson.deposit);

  lessonSelect.value = value;
  depositOutput.textContent = hasFixedPrice ? formatter.format(lesson.deposit) : lesson.depositLabel;
  balanceOutput.textContent = hasFixedPrice ? formatter.format(lesson.price - lesson.deposit) : lesson.balanceLabel;
  totalOutput.textContent = hasFixedPrice ? `${formatter.format(lesson.price)} USD` : lesson.totalLabel;
  payButton.textContent = lesson.actionLabel;

  lessonCards.forEach((card) => {
    card.classList.toggle("is-active", card.dataset.selectLesson === value);
  });

  updateInlineBooking();
}

function getBookingUrl() {
  const selected = lessonSelect.value;
  return GOOGLE_APPOINTMENT_SCHEDULES[selected] || "";
}

function hasGoogleBookingUrl(url) {
  return /^https:\/\/calendar\.google\.com\/calendar\/.*appointments\/schedules\//.test(url)
    || /^https:\/\/calendar\.app\.google\//.test(url);
}

function updateInlineBooking() {
  const url = getBookingUrl();

  if (hasGoogleBookingUrl(url)) {
    inlineBookingFrame.src = url;
    inlineBookingFrame.hidden = false;
    inlineSetupPanel.hidden = true;
    return;
  }

  inlineBookingFrame.removeAttribute("src");
  inlineBookingFrame.hidden = true;
  inlineSetupPanel.hidden = false;
}

function openBookingModal() {
  const url = getBookingUrl();
  const lesson = lessonData[lessonSelect.value] || lessonData.private1hr;

  if (lessonSelect.value === "choreography" && !hasGoogleBookingUrl(url)) {
    window.open(INSTAGRAM_URL, "_blank", "noopener");
    return;
  }

  bookingModal.hidden = false;
  document.body.style.overflow = "hidden";
  modalSubtitle.textContent = `${lesson.label} opens in your Google Calendar booking flow.`;

  if (hasGoogleBookingUrl(url)) {
    bookingFrame.src = url;
    bookingFrame.hidden = false;
    setupPanel.hidden = true;
    return;
  }

  bookingFrame.removeAttribute("src");
  bookingFrame.hidden = true;
  setupPanel.hidden = false;
  modalSubtitle.textContent = "Your Google appointment schedule link still needs to be added.";
}

function closeBookingModal() {
  bookingModal.hidden = true;
  bookingFrame.removeAttribute("src");
  document.body.style.overflow = "";
}

lessonSelect.addEventListener("change", (event) => {
  updateLesson(event.target.value);
});

lessonCards.forEach((card) => {
  card.addEventListener("click", () => {
    updateLesson(card.dataset.selectLesson);
  });
});

bookingTriggers.forEach((trigger) => {
  trigger.addEventListener("click", openBookingModal);
});

closeButtons.forEach((button) => {
  button.addEventListener("click", closeBookingModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !bookingModal.hidden) {
    closeBookingModal();
  }
});

updateLesson("private1hr");
