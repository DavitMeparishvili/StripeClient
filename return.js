initialize();

async function initialize() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const sessionId = urlParams.get("session_id");
  debugger;
  const response = await fetch(
    `http://localhost:4000/api/stripe/session-status?session_id=${sessionId}`
  );
  const session = await response.json();

  if (session.status == "open") {
    window.replace("http://localhost:4242/checkout.html");
  } else if (session.status == "complete") {
    document.getElementById("success").classList.remove("hidden");
    document.getElementById("customer-email").textContent =
      session.customer_email;
  }
}
