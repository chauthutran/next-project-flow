export default function TabsNavigation() {
    return (
        <Tabs defaultValue="details">
        <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
        </TabsList>
    </Tabs>
    )
}