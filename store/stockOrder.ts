import { useCurrencyPair } from "./currencyPair";

export const useStockOrder = defineStore('stockOrderStore', () => {
    const store = useCurrencyPair();
    interface DepthItem {
        price: number;
        quantity: number;
        total: number;
    }
    
    // Definition of the Depth interface for order book data
    interface Depth {
        asks: DepthItem[];
        bids: DepthItem[];
    }
    
    // little crutch for fix POJO error with ssr
    const depthItemConstructor = (parameters: number[]) => {
        return {
            price: Number(parameters[0]),
            quantity: Number(parameters[1]),
            total: Number(parameters[0]) * Number(parameters[1]),

        }
    }
    const depthData: Ref<Depth> = ref({ asks: [], bids: [] });
    const lastUpdateId: Ref<number> = ref(0);
    
    // Function to fetch the order book snapshot
    const getDepth = async () => {
        try {
            const { data } = await useFetch(`https://api.binance.com/api/v3/depth?symbol=${store.currentPair}&limit=1000`);
            const response = data.value;
            lastUpdateId.value = response.lastUpdateId as number;
            depthData.value = {
                asks: response.asks.map((e: number[]) => depthItemConstructor(e)),
                bids: response.bids.map((e: number[]) => depthItemConstructor(e)),
            };
        } catch (error) {
            console.error('Request error - ', error);
        }
    };
    
    
    
    // Mounting hook to establish a WebSocket connection
    onMounted(() => {
        // Function to handle WebSocket messages
        function handleStream(event: MessageEvent) {
            const json = JSON.parse(event.data);
            if (json.U <= lastUpdateId.value) {
                return;
            }
            if (json.U <= lastUpdateId.value + 1 && json.u >= lastUpdateId.value + 1) {
                depthData.value = {
                    asks: json.a.filter((e: number[]) => Number(e[1]) !== 0).map((e: number[]) => depthItemConstructor(e)),
                    bids: json.b.filter((e: number[]) => Number(e[1]) !== 0).map((e: number[]) => depthItemConstructor(e)),
                };
            }
            lastUpdateId.value = json.u;
        }
    
        // Connect to WebSocket for order book data
        const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${store.currentPair.toLocaleLowerCase()}@depth`);
    
        socket.addEventListener('message', handleStream);
        socket.addEventListener('open', () => console.log('Connected to WebSocket API Binance'));
        socket.addEventListener('error', (error) => console.error('Error connecting to WebSocket API Binance:', error));
        socket.addEventListener('close', () => console.log('Connection with WebSocket API Binance is closed'));
    });
    return {getDepth, depthData}
})