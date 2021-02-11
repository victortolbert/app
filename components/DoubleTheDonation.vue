<template>
  <div class="max-w-xl mx-auto mb-16 text-lg text-left">
    <div class="mb-8 corp-title left-align">
      <strong>
        Here's how to get started on your corporate matching gift!
      </strong>
    </div>
    <div class="mb-8 corp-list">
      <div>
        <span class="circle-number">
          <strong>1.</strong>
        </span>
        Search for your employer below
      </div>
      <div>
        <span class="circle-number"> <strong>2.</strong></span>
        Follow their instructions to submit this request
      </div>
      <div v-if="legalName !== 'Booster Enterprises'">
        <span class="circle-number"> <strong>3.</strong></span>
        Use {{ legalName }} Federal Tax ID: {{ taxId }}
      </div>
    </div>

    <p v-if="legalName !== 'Booster Enterprises'" class="pb-3 left-align">
      {{ legalName }} Federal Tax ID: <strong>{{ taxId }}</strong>
    </p>

    <p v-if="legalName !== 'Booster Enterprises'" class="py-3 mb-8 left-align">
      If you have any questions, please reach out to the
      <strong>{{ legalName }}. </strong>
    </p>
    <div id="dd-container" class="m-top-20">
      <a
        href="https://doublethedonation.com/matching-grant-resources/matching-gift-basics/"
      >
        Matching Gift
      </a>
      and
      <a
        href="https://doublethedonation.com/matching-grant-resources/volunteer-grant-basics/"
      >
        Volunteer Grant
      </a>
      information provided by <br />
      <a href="https://doublethedonation.com">
        <img
          alt="Powered by Double the Donation"
          src="https://doublethedonation.com/api/img/powered-by.png"
        />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DoubleTheDonation',
  computed: {
    doubleTheDonationKey() {
      return this.$store.state.doubleTheDonationKey
    },
    legalName() {
      return this.$store.state.merchantLegalName
    },
    taxId() {
      return this.$store.state.merchantTaxId
    },
  },
  mounted() {
    window.DDCONF = {API_KEY: this.doubleTheDonationKey}
    this.$nextTick(() => {
      this.loadDoubleTheDonation()
      this.sendPledgeToDoubleTheDonation()
    })
  },
  methods: {
    loadDoubleTheDonation() {
      window.doublethedonation.plugin.load_plugin()
    },
    sendPledgeToDoubleTheDonation() {
      if (window.doublethedonation) {
        // Don't break your page if our plugin doesn't load for any reason
        const companyIdNode = document.getElementsByName(
          'doubledonation_company_id',
        )
        let dtdSelectedCompany = null
        if (companyIdNode.length > 0) {
          dtdSelectedCompany = companyIdNode[0].value
        }
        const campaign = 'Direct Give'
        window.doublethedonation.integrations.core.register_donation({
          '360matchpro_public_key': window.DDCONF.API_KEY, // Replace this key with your 360MatchPro public key
          campaign,
          donation_identifier: this.$store.state.pledge.cc_transactions[0]
            .order_id,
          donation_amount: this.$store.state.pledge.amount,
          donor_first_name: this.$store.state.pledge.pledge_sponsor.first_name,
          donor_last_name: this.$store.state.pledge.pledge_sponsor.last_name,
          donor_email: this.$store.state.pledge.pledge_sponsor.email,
          donor_address: {
            zip: this.$store.state.pledge.pledge_sponsor.zip, // numeric, but string (eg. "30301", "30101-123") will work
          },
          donation_datetime: this.$store.state.pledge.ts_entered,
        })
        window.doublethedonation.plugin.load_config()
        window.doublethedonation.plugin.set_donation_identifier(
          this.$store.state.pledge.cc_transactions[0].order_id,
        ) // Replace with actual identifier or an empty string
        window.doublethedonation.plugin.set_donation_campaign(campaign) // Replace with actual campaign
        if (dtdSelectedCompany) {
          window.doublethedonation.plugin.set_company(dtdSelectedCompany)
        } else {
          const domain = window.doublethedonation.integrations.core.strip_domain(
            this.$store.state.pledge.pledge_sponsor.email,
          ) // Replace "DONOR_EMAIL_ADDRESS" with actual email
          window.doublethedonation.plugin.email_domain(domain) // Checks for a company based on the email address
        }
      }
    },
  },
}
</script>
