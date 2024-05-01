<template>
    <Head>
        <Title>
            Option
        </Title>
        <Meta
            name="description"
            hid="description"
            content='Option'
        />
    </Head>
    <div class="main-page">
        <v-select
            label="currency pair"
            :items="items"
            variant="solo-filled"
            :item-props="true"
            v-model="store.currentPair"
        />
        <v-table>
            <thead>
                <tr>
                    <th>
                        old value
                    </th>
                    <th>
                        new value
                    </th>
                    <th>
                        change time
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="item in store.history"
                    :key="item.changeTime"
                >
                    <td>{{ item.old }}</td>
                    <td>{{ item.new }}</td>
                    <td>{{ item.changeTime }}</td>
                </tr>
            </tbody>
        </v-table>

    </div>
</template>

<script setup lang="ts">
    import { useCurrencyPair } from '~/store/currencyPair';
    const store = useCurrencyPair();
    class item {
        title: String | undefined;
        subtitle: String | undefined;
    }

    const items: item[] = [
        {
            title: 'BTCUSDT',
            subtitle: 'Bitcoin / Tether'
        },
        {
            title: 'BNBBTC',
            subtitle: 'Binance Coin / Bitcoin'
        },
        {
            title: 'ETHBTC',
            subtitle: 'Ethereum / Bitcoin'
        }
    ]

</script>