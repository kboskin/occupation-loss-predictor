"""forecasts

Revision ID: 2
Revises: 1
Create Date: 2024-03-16 20:39:42.013199

"""
from alembic import op


# revision identifiers, used by Alembic.
revision = '2'
down_revision = '1'
branch_labels = None
depends_on = None


def upgrade():
    # Creating enum type if not exists
    op.execute("""
    DO $$ 
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'lossesprojectenum') THEN
            CREATE TYPE lossesprojectenum AS ENUM (
                'aircraft', 
                'aircraft_warfare', 
                'apv', 
                'artillery', 
                'fuel_tanks', 
                'helicopters', 
                'missiles', 
                'mlrs', 
                'personnel', 
                'special_equipment', 
                'submarines', 
                'tanks', 
                'uav', 
                'warships'
            );
        END IF;
    END$$;
    """)

    # Creating table 'forecasts' if not exists
    op.execute("""
    CREATE TABLE IF NOT EXISTS forecasts (
        id SERIAL PRIMARY KEY,
        created_time TIMESTAMP NOT NULL DEFAULT now(),
        updated_time TIMESTAMP NOT NULL DEFAULT now(),
        deleted_time TIMESTAMP
    );
    """)

    # Creating table 'forecasts_data' if not exists
    op.execute("""
    CREATE TABLE IF NOT EXISTS forecasts_data (
        id SERIAL,
        forecast_added INTEGER NOT NULL,
        forecast_time TIMESTAMP NOT NULL,
        forecast_type lossesprojectenum NOT NULL,
        parent_forecast_id INTEGER NOT NULL REFERENCES forecasts(id) ON DELETE CASCADE,
        created_time TIMESTAMP NOT NULL DEFAULT now(),
        updated_time TIMESTAMP NOT NULL DEFAULT now(),
        deleted_time TIMESTAMP,
        PRIMARY KEY (id, parent_forecast_id)
    );
    """)


def downgrade():
    # Dropping table 'forecasts_data' if exists
    op.execute("DROP TABLE IF EXISTS forecasts_data;")

    # Dropping table 'forecasts' if exists
    op.execute("DROP TABLE IF EXISTS forecasts;")

    # Dropping enum type if exists
    op.execute("DROP TYPE IF EXISTS lossesprojectenum;")
