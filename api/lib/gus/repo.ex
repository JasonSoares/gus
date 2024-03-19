defmodule GUS.Repo do
  use Ecto.Repo,
    otp_app: :gus,
    adapter: Ecto.Adapters.Postgres
end
