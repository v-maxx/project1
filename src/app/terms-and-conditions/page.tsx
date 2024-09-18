import React from 'react';

const Page = () => {


    return (<div className="container py-10">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="mb-4">
                Thank you for visiting the Government of National Capital Territory of Delhi website and reviewing our
                privacy policy.
            </p>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold  mb-2">Automatically Collected and Stored
                    Information</h2>
                <p className="mb-4">
                    When you browse, read pages, or download information on this website, we automatically collect and
                    store certain technical information about your visit. This information never reveals who you are.
                </p>
                <p className="mb-2">The information we collect and store about your visit includes:</p>
                <ul className="list-disc list-inside mb-4">
                    <li>The Internet domain (e.g., mtnl.net.in) and IP address of your service provider from which you
                        access our website.
                    </li>
                    <li>The browser used to access our site (e.g., Firefox, Netscape, Internet Explorer) and operating
                        system (Windows, Unix).
                    </li>
                    <li>The date and time you accessed our site.</li>
                    <li>The pages/URLs you viewed.</li>
                    <li>If you reached this website from another website, the address of that referring website.</li>
                </ul>
                <p>
                    This information is used only to help us make this site more useful to you. From this data, we gain
                    insight into the number of visitors to our site and what technology our visitors use. We never track
                    or record information about individuals and their visits.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold  mb-2">Cookies</h2>
                <p className="mb-4">
                    When you visit some websites, they may download small pieces of software called cookies onto your
                    computer or browsing device. Some cookies collect personal information to recognize your computer in
                    the future. We only use non-persistent cookies or "per-session cookies".
                </p>
                <p className="mb-4">
                    Per-session cookies serve technical purposes, such as providing seamless navigation on this website.
                    These cookies do not collect personal information and are deleted as soon as you leave our website.
                </p>
                <p>
                    Cookies do not permanently record data and are not stored on your computer's hard drive. They are
                    stored in memory and only available during an active browser session. Once you close your browser,
                    the cookie disappears.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold  mb-2">If You Send Us Personal Information</h2>
                <p className="mb-4">
                    We do not collect personal information for any purpose other than to respond to you (for example, to
                    answer your questions or provide you with the subscriptions you have selected). If you choose to
                    provide us with personal information – such as by filling out a Contact Us form, with an email
                    address and PIN code, and submitting it through the website – we use that information to respond to
                    your message and to help you receive the information you have requested.
                </p>
                <p className="mb-4">
                    We share the information you provide with another government agency only if your question pertains
                    to that agency or is otherwise required by law.
                </p>
                <p>
                    Our website never collects information for commercial marketing or creates individual profiles.
                    While you must provide an email address for a localized response to any questions or comments you
                    have with us, we recommend that you do not include any other personal information.
                </p>
            </section>
        </div>);

};

export default Page;
