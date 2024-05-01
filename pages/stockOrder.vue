<template>
    <Head>
        <Title>
            Order Book
        </Title>
        <Meta
            name="description"
            hid="description"
            content='Order Book'
        />
    </Head>
    <section class="order-book">
        <h1 class="order-book__header">
            {{ currencyPairstore.currenyName }}
        </h1>
        <div class="order-book__content">
            <v-table class="order-book__table order-table bids">
                <thead class="order-table__header">
                    <tr>
                        <th
                            v-for="column in tableColumns"
                            :key="column"
                            :class="`order-table__header-${column}`"
                        >
                            {{ column }}
                        </th>
                    </tr>
                </thead>
                <tbody class="order-table__body">
                    <tr
                        v-for="item in bids"
                        :key="item.price"
                    >
                        <td
                            v-for="column in tableColumns"
                            :key="column"
                            :class="`order-table__body-${column}`"
                        >
                            {{ item[column] }}
                        </td>
                    </tr>
                </tbody>
            </v-table>
            <v-table class="order-book__table order-table asks">
                <thead class="order-table__header">
                    <tr>
                        <th
                            v-for="column in tableColumns"
                            :key="column"
                            :class="`order-table__header-${column}`"
                        >
                            {{ column }}
                        </th>
                    </tr>
                </thead>
                <tbody class="order-table__body">
                    <tr
                        v-for="item in asks"
                        :key="item.price"
                    >
                        <td
                            v-for="column in tableColumns"
                            :key="column"
                            :class="`order-table__body-${column}`"
                        >
                            {{ item[column] }}
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </div>
        <div class="order-book__options">
            <v-select
                label="size"
                :items="[10,20,50,100,500]"
                variant="solo-filled"
                :item-props="true"
                v-model="limit"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
import { useStockOrder } from '~/store/stockOrder';
import { useCurrencyPair } from '~/store/currencyPair';
const currencyPairstore = useCurrencyPair();
const store = useStockOrder();

await store.getDepth();

const tableColumns: string[] = [
    'price',
    'quantity',
    'total',
]
const limit: Ref<number> = ref(10)
const asks = computed(() => {
    return store.depthData.asks.slice(0, limit.value)
})
const bids = computed(() => {
    return store.depthData.asks.slice(0, limit.value)
})
    
onMounted(() => {
    store.openWwsConection()
})
onBeforeUnmount(() => {
    store.closeWwsConection()
})
</script>