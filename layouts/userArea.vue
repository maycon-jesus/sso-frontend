<template>
    <v-app>

        <v-app-bar app>
            Header
        </v-app-bar>

        <!-- Sizes your content based upon application components -->
        <v-main>
            <slot/>
        </v-main>

        <v-footer :elevation="4" :style="{
            flex: 0
        }">
            Footer
        </v-footer>
    </v-app>
</template>