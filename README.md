# DuckDuckGo Mailer
A simple website to create target mail address of DuckDuckGo Mail Protection.


## How DDG Private Mail Works
DDG generates a private mail in the form of `randomString@duck.com`,

If someone sends you mail to that address, let's say `name@domain.com`, it will be forwarded to you from DDG Mail service, and the email address of the forwarder(DDG) will be in the form of `name_at_domain.com_randomString@duck.com`

You can reply to `name_at_domain.com_randomString@duck.com` and `name@domain.com` will receive your reply, that DDG will forward, from `randomString@duck.com`

### **What does this all mean?:**

If you write the target email correctly and send email to that, DDG will forward from your private address to anyone you choose to.

For example I want to send email to `coca@cola.com` from my private DDG mail `asdf@duck.com`

The target email should be:

`coca_at_cola.com_asdf@duck.com`

And when you send an email to that address, coca cola will receive your email from `asdf@duck.com` and that way you protect your real email.

### **Are there any limits?**

As of today 01/04/2025, there are none I have encountered, other services limit your ability to reply but with DDG it is free, mainly because of the way it works. Firefox Relay for example ONLY allows you to reply to FORWARDED emails no older than a few months(don't remember the exact number). Firefox Relay's design flaw is to blame. Apple's relay seems to work similarly to DDG, but once your subscription of iCloud is over, you probably lose even the ability for mails to be forwarded to you.
