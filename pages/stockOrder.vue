<template>
    <v-select
        label="currency pair"
        :items="[10,20,50,100,500]"
        variant="solo-filled"
        :item-props="true"
        v-model="limit"
    />
    <v-table>
        <thead>
            <tr>
                <th>
                    price
                </th>
                <th>
                    quanity
                </th>
                <th>
                    total
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="item in store.depthData.asks.slice(0,limit)"
                :key="item.price"
            >
                <td>{{ item.price }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.total }}</td>
            </tr>
        </tbody>
    </v-table>
    <v-table>
        <thead>
            <tr>
                <th>
                    price
                </th>
                <th>
                    quanity
                </th>
                <th>
                    total
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="item in store.depthData.bids.slice(0,limit)"
                :key="item.price"
            >
                <td>{{ item.price }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.total }}</td>
            </tr>
        </tbody>
    </v-table>
</template>

<script setup lang="ts">

import { useStockOrder } from '~/store/stockOrder';
const store = useStockOrder();
// Fetch the order book snapshot on component mount
await store.getDepth();
const limit: Ref<number> = ref(10)
</script>