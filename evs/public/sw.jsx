// console.log("Service Worker From Public Folder");
let cacheData = 'votingApp';

this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            return cache.addAll([
                '@vite/client',
                '/Images/HomePageImages/One.jpg?auto=compress&cs=tinysrgb&dpr=2&w=500',
                '/node_modules/.vite/deps/react-chartjs-2.js?v=1ba02d2b',
                '/node_modules/.vite/deps/react-copy-to-clipboard.js?v=1ba02d2b',
                '/node_modules/.vite/deps/react-dom_client.js?v=1ba02d2b',
                '/node_modules/.vite/deps/react-icons_fa6.js?v=1ba02d2b',
                '/node_modules/.vite/deps/react-icons_lia.js?v=1ba02d2b',
                '/node_modules/.vite/deps/react-icons_md.js?v=1ba02d2b',
                '/node_modules/.vite/deps/react-icons_ri.js?v=1ba02d2b',
                '/node_modules/.vite/deps/react-redux.js?v=1ba02d2b',
                '/node_modules/.vite/deps/react-router-dom.js?v=1ba02d2b',
                '/node_modules/.vite/deps/react.js?v=1ba02d2b',
                'node_modules/.vite/deps/react_jsx-dev-runtime.js?v=1ba02d2b',
                '/src/components/Result/Result.jsx',
                '/src/components/SignupForm/SignupForm.jsx',
                '/src/store/store.jsx',
                '/src/swDev.jsx?t=1710756097309',
                'src/App.css',
                '/src/layout/Layout.jsx?t=1710756902',
                '/src/pages/CandidatesList/Candidate',
                '/src/pages/Home/Home.jsx?t=1710756779823',
                'src/pages/CampaignPage/CampaignPage.jsx',
                '/src/pages/NoMatch/Index.jsx',
                '/src/pages/candidatesVoting/candidatesVoting.jsx',
                'src/components/LoginForm/LoginForm.jsx',
                '/src/components/adminDashboard/adminDashboard.jsx',
                'src/pages/CampaignManagementPage/CampaignManagementPage.jsx',
                '/src/slices/canidateSlice/canidateSlice.jsx',
                'src/slices/voteCandidates/voteCandidates.jsx',
                '/src/slices/campaignSlice/index.jsx',
                '/src/slices/adminSlice/adminSlice.jsx',
                'src/slices/userSlice/userSlice.jsx',
                '/src/slices/dyanmicCandidateSlice/dy',
                '/src/slices/allowedUser/allowedUser.jsx',
                'src/slices/clearArray/clearArray.jsx',
                '/src/components/Navbar/Navbar.jsx?t=1710756902062',
                'src/components/Footer/Footer.jsx',
                'src/components/NewCandidateForm/AddNewCandidateForm.jsx',
                'src/components/HomePageHero.jsx/HomePageHero.jsx',
                '/src/components/HomePageSection/HomePageSection.jsx?t=1710756779823',
                'src/components/HomePageFAQ/HomePageFAQ.jsx',
                'Images/Logo/EvsLogo.jpg',
                'Images/HomePageImages/two.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                'Images/HomePageImages/three.png?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                // 'Images/HomePageImages/One.jpg?auto=compress&cs=tinysrgb&dpr=2&w=500',                                
                '/index.html',
                '/'
            ])
        })
    )
})

this.addEventListener("fetch", (event) => {
    if (!navigator.onLine) {
        event.respondWith(
            caches.match(event.request).then((localResponse) => {
                // If the requested asset is in the cache, respond with it
                if (localResponse) {
                    return localResponse;
                }

                // Otherwise, fetch the asset from the network
                return fetch(event.request).then((networkResponse) => {
                    // Clone the networkResponse before storing it in the cache
                    const responseToCache = networkResponse.clone();

                    // Cache the fetched asset for future use
                    caches.open(cacheData).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });

                    // Return the fetched asset
                    return networkResponse;
                });
            })
        );
    }
});
