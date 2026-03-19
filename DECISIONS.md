## 发现的问题

1. TypeError: getBookingStatus is not a function
2. RoomRow 组件重复渲染
3. 打开 Booking Detail 弹窗时 RoomRow 组件重复渲染
4. visibleBookings 代码重复代码有点多
5. ticketId 来源混乱

## 应用的修复

1. 对于问题1，我将getBookingStatus函数移动到visibleBookings中，并直接使用STATUS_COLORS。
2. 对于问题2，经排查发现是由于RoomRow组件使用了AppContext中的hoveredCell，而hoveredCell是使用js控制的，每次hoveredCell都会导致RoomRow组件重新渲染。而 hoveredCell 只用来显示hover时的背景色，但这个功能使用css的:hover就能实现，所以直接移除了hoveredCell的使用。另外给RoomRow组件添加了memo，以减少不必要的渲染。
3. 在点击 RoomCell 并打开 Booking Detail 弹窗时发现控制台一直输出 render，经排查发现是 BookingGrid 没有添加 memo。还有就是 BookingGrid 中 `const roomBookings = bookings.filter(b => b.roomUnit.roomId === room.id)` 这段代码一直在返回新数组，所以添加了 memo 和 useMemo。
4. visibleBookings 代码重复代码有点多，让ai简化了一下
5. `const currentTicketId = (router.query.ticketId as string) ?? initialTicketId ?? activeTicketId` 有来自url的，有来自props，也有来自context的，不确定是否会有一些三个状态更新时机不一致而导致的bug。而且这样维护起来也麻烦，所以直接使用了url上的参数。

## 权衡取舍

1. 对于问题1，保留 getBookingStatus 函数，将其声明移动到 visibleBookings 之前，并使用useCallback包裹，然后将它放到 visibleBookings 的 deps 中可能可读性会更好一点，但 getBookingStatus 的逻辑简单，而且只有一个地方使用。所以没有做。
2. 对于问题2，因为这是一个小型的demo，可以清晰的了解影响范围，所以直接移除了hoveredCell的使用。如果是一个大型的项目，可能需要先分析hoveredCell的使用场景，再决定是否移除。
3. 无
4. 无
5. 对于问题5，不知是否业务上确实有这样的需要，使用多个数据来源，至少目前没有看到。

## 如果有更多时间

1. 无
2. 在解决问题2的过程中，发现项目中好多地方都使用了style行内样式，可以考虑使用class或者tailwind css这种样式框架来统一管理。
3. 无
4. 无
5. 在解决问题5的时候，发现 MessageContext 中 currentHouse 没有被其他地方使用，再看要不要删掉。
