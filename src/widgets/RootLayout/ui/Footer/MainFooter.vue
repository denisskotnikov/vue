<script setup lang="ts">
import { MainContainer } from '@/shared/ui';

import { ASSISTANCE_MENU, SERVICES_MENU, SOCIAL_MENU } from '@/widgets/RootLayout/ui/Footer/const.ts';
</script>
<template>
    <footer class="footer">
        <MainContainer class="container">
            <div class="top">
                <Image class="logo" src="/logo-white.svg" width="65" />
                <p>
                    We are a residential interior design firm located in Portland. Our boutique-studio offers more than
                </p>
            </div>
            <nav class="menu services">
                <h5 class="title">Services</h5>
                <ul>
                    <li v-for="service of SERVICES_MENU" :key="service.id">
                        <a class="link" :href="service.href">
                            {{ service.label }}
                        </a>
                    </li>
                </ul>
            </nav>
            <nav class="menu assistance">
                <h5 class="title">Assistance to the buyer</h5>
                <ul>
                    <li v-for="service of ASSISTANCE_MENU" :key="service.id">
                        <a class="link" :href="service.href">
                            {{ service.label }}
                        </a>
                    </li>
                </ul>
            </nav>
            <ul class="socials">
                <li v-for="service of SOCIAL_MENU" :key="service.id">
                    <a class="link" :href="service.href">
                        <span :class="service.icon" />
                    </a>
                </li>
            </ul>
        </MainContainer>
    </footer>
</template>
<style scoped>
.footer {
    padding: 48px 32px;
    color: #fff;
    background-color: #181313;
}

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;

    @media (width >= 992px) {
        display: grid;
        justify-content: normal;
        grid-template-areas:
            'top services assistance'
            'socials . .';
        grid-template-columns: 384px 1fr 1fr;
        text-align: left;
    }
}

.top {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    grid-area: top;
    margin-bottom: 32px;
    font-size: 13px;
    line-height: 24px;
    color: #cfcfcf;

    @media (width >= 992px) {
        place-content: start;
        align-items: start;
        margin-right: 113px;
        text-align: left;
    }
}

.logo {
    margin-bottom: 16px;
}

.menu {
    margin-bottom: 32px;

    @media (width >= 992px) {
        margin-bottom: 0;
    }
}

.title {
    margin-bottom: 8px;
    font-size: 16px;
    line-height: 1;
}

.link {
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 32px;
    color: #cfcfcf;
}

.services {
    grid-area: services;
}

.assistance {
    grid-area: assistance;
}

.socials {
    display: grid;
    place-content: center;
    place-items: center;
    grid-area: socials;
    grid-template-columns: repeat(4, 1fr);
    margin: auto;
    max-width: 173px;
    gap: 24px;

    span {
        font-size: 24px;
    }

    @media (width >= 992px) {
        align-items: center;
        margin: 24px 0 0;
        max-width: max-content;
        gap: 40px;
    }
}
</style>
