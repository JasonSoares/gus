defmodule GUS.Repo.Migrations.AddVisitCounterCache do
  use Ecto.Migration

  def change do
    alter table(:links) do
      add :visit_count, :integer, null: false, default: 0
    end
  end
end
