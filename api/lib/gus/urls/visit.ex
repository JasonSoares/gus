defmodule GUS.Urls.Visit do
  @moduledoc """
  Schema representing a Visit for a link
  """
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query, warn: false

  alias GUS.Urls.Link

  @type t :: %__MODULE__{
          id: integer(),
          link_id: integer(),
          inserted_at: NaiveDateTime.t(),
          updated_at: NaiveDateTime.t()
        }

  schema "visits" do
    belongs_to(:link, GUS.Urls.Link)

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(visit, attrs) do
    visit
    |> cast(attrs, [:link_id])
    |> validate_required([:link_id])
    |> foreign_key_constraint(:link_id, on_delete: :delete_all)
    |> increment_visit_count()
  end

  defp increment_visit_count(changeset) do
    changeset
    |> prepare_changes(fn prepared_changeset ->
      repo = prepared_changeset.repo
      link_id = get_field(prepared_changeset, :link_id)

      from(l in Link, where: l.id == ^link_id)
      |> repo.update_all(inc: [visit_count: 1])

      prepared_changeset
    end)
  end
end
