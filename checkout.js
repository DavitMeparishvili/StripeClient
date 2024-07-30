const stripe = Stripe(
  "pk_test_51PgJWHK4fDeIIHWZmno0otYwwjWcWtxZO7yK2agdk0YQN2aDssiyrXEyIjsfYRXPd0sq9PpVM5hUWCTBH9mM9XGs00WDDK27VM"
);

initialize();

// Create a Checkout Session
async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch(
      "http://localhost:4000/api/stripe/create-checkout-session-subscription",
      {
        method: "POST",
        body: JSON.stringify({
          email: "admin@gmail.com",
          type: "Monthly",
        }),
      }
    );
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount Checkout
  checkout.mount("#checkout");
}
