HIGH_RISK_WORDS = [
    # Criptomonedas y fraudes financieros
    "bitcoin", "ethereum", "ripple", "litecoin", "monero", "zcash", "dogecoin", "tron", "cardano", "ico", 
    "airdrop", "wallet", "blockchain", "binance", "coinbase", "altcoin", "defi", "nft", "forex", "trading",

    # Fraudes y estafas
    "lottery", "prize", "winner", "congratulations", "jackpot", "scam", "fraud", "phishing", "hack", "malware", 
    "spyware", "ransomware", "trojan", "virus", "identity theft", "impersonation", "fake", "spoof", "fraudulent",

    # Cuentas bancarias y transacciones sospechosas
    "swift", "iban", "bic", "routing number", "sort code", "payment gateway", "chargeback", "unsecured",

    # Contenido inapropiado
    "porn", "loli", "nude", "xxx", "camgirl", "escort", "fetish", "bdsm", "incest", "bestiality", "rape", 
    "hentai", "pussy", "dick", "cock", "blowjob", "cum", "naked", "tits", "boobs", "nipples", "gangbang", "orgy",

    # Medicamentos y remedios milagrosos
    "viagra", "cialis", "rx", "prescription", "meds", "herbal", "remedy", "supplement", "miracle", "cure",
    "weight loss", "fat burner", "enlargement", "enhancement", "erection", "libido"
]

MODERATE_RISK_WORDS = [
    # Finanzas y monedas
    "currency", "exchange", "investment", "invest", "profit", "earnings", "funds", "loan", "mortgage", 
    "credit", "debit", "invoice", "billing", "paypal", "venmo", "zelle", "skrill", "western union", "moneygram",

    # Palabras relacionadas con ofertas y urgencia
    "free", "gift", "guaranteed", "limited time", "offer", "exclusive", "click here", "act now", "risk-free", 
    "no obligation", "urgent", "confidential", "authorize", "verify"
]

LOW_RISK_WORDS = [
    # Palabras que pueden ser genéricas pero en combinación son sospechosas
    "bank", "account", "deposit", "withdrawal", "transfer", "payment", "atm", "visa", "mastercard", 
    "facebook", "instagram", "twitter", "linkedin", "tiktok", "snapchat", "whatsapp", "telegram", "discord"
]

CURRENCY_WORDS = [
    # Divisas
    "pound", "yen", "yuan", "rupee", "peso", "real", "ruble", "franc", "lira", "dinar", "dirham", 
    "won", "krona", "krone", "kroner", "dollar", "euro"
]

ALLOWED_LINKS = ["github", "linkedin", "twitter", "instagram", "facebook", "stackoverflow", "telegram", "t.me", "whatsapp", "wa.me"]