defmodule GUS.Repo.Migrations.CreateVisits do
  use Ecto.Migration

  def change do
    create table(:visits) do
      add :link_id, references(:links, on_delete: :delete_all), null: false

      timestamps(type: :utc_datetime)
    end

    create index(:visits, [:link_id])
  end
end
