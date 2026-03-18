## 发现的问题

1. TypeError: getBookingStatus is not a function

## 应用的修复

1. 对于问题1，我将getBookingStatus函数移动到visibleBookings中，并直接使用STATUS_COLORS。

## 权衡取舍

1. 对于问题1，保留 getBookingStatus 函数，将其声明移动到 visibleBookings 之前，并使用useMemo包裹，然后将它放到 visibleBookings 的 deps 中可能可读性会更好一点，但 getBookingStatus 的逻辑简单，而且只有一个地方使用。所以没有做。

## 如果有更多时间

1. 无
