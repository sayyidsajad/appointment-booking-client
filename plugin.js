window.AppointmentBookingPlugin = {
  init({ apiBaseUrl }) {
    const root = document.getElementById("appointment-booking");
    root.innerHTML = this.renderForm();

    const nameEl = document.getElementById("name");
    const phoneEl = document.getElementById("phone");
    const dateEl = document.getElementById("date");
    const slotEl = document.getElementById("slots");
    const bookBtn = document.getElementById("bookBtn");
    const messageEl = document.getElementById("message");

    const today = new Date().toISOString().split("T")[0];
    dateEl.setAttribute("min", today);

    const isValidName = (name) => /^[a-zA-Z\s]{2,50}$/.test(name);
    const isNumeric = (value) => /^[0-9]+$/.test(value);
    const showMessage = (msg) => {
      const isSuccess = msg.toLowerCase().includes("success");
      messageEl.innerText = msg;
      messageEl.style.color = isSuccess ? "green" : "red";
    };

    dateEl.addEventListener("change", async () => {
      const date = dateEl.value;
      if (!date) return;

      try {
        const res = await fetch(`${apiBaseUrl}/available-slots?date=${date}`);
        const slots = await res.json();
        this.populateSlots(slotEl, slots);
      } catch {
        showMessage("Failed to load slots. Try again.");
      }
    });

    bookBtn.addEventListener("click", async () => {
      const name = nameEl.value.trim();
      const phone = phoneEl.value.trim();
      const date = dateEl.value;
      const time_slot = slotEl.value;

      // Validation
      if (!isValidName(name)) return showMessage("Enter a valid name.");
      if (!isNumeric(phone))
        return showMessage("Phone number must contain only digits.");
      if (phone.length < 10 || phone.length > 15)
        return showMessage("Phone number must be between 10 and 15 digits.");
      if (!date) return showMessage("Please select a date.");
      if (!time_slot) return showMessage("Please select a time slot.");

      // Submit form
      bookBtn.disabled = true;
      bookBtn.innerText = "Booking...";

      try {
        const res = await fetch(`${apiBaseUrl}/book`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, phone, date, time_slot }),
        });
        const data = await res.json();

        showMessage(data.message || data.error);
        if (!data.error) this.resetForm(nameEl, phoneEl, dateEl, slotEl);
      } catch {
        showMessage("Something went wrong. Please try again.");
      } finally {
        bookBtn.disabled = false;
        bookBtn.innerText = "Book";
      }
    });
  },

  renderForm() {
    return `
      <div class="booking-form">
        <input type="text" id="name" placeholder="Your Name" />
        <input type="tel" id="phone" placeholder="Phone Number" />
        <input type="date" id="date" />
        <select id="slots">
          <option value="">Select a time slot</option>
        </select>
        <button id="bookBtn">Book</button>
        <p id="message"></p>
      </div>
    `;
  },

  populateSlots(selectEl, slots) {
    selectEl.innerHTML =
      '<option value="">Select a time slot</option>' +
      slots.map((s) => `<option value="${s}">${s}</option>`).join("");
  },

  resetForm(nameEl, phoneEl, dateEl, slotEl) {
    nameEl.value = "";
    phoneEl.value = "";
    dateEl.value = "";
    slotEl.innerHTML = '<option value="">Select a time slot</option>';
  },
};
