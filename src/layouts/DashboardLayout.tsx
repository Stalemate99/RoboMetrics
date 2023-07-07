function DashboardLayout() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <section>Sidebar Component</section>
      <section className="col-span-2">
        <h2>Dashboard Component</h2>
      </section>
    </div>
  );
}

export default DashboardLayout;
