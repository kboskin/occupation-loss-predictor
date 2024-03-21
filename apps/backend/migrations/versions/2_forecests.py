"""forecests

Revision ID: 2
Revises: 1
Create Date: 2024-03-16 20:39:42.013199

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2'
down_revision = '1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('forecasts',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('created_time', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_time', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.Column('deleted_time', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('forecasts_data',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('forecast_added', sa.Integer(), nullable=False),
    sa.Column('forecast_time', sa.DateTime(), nullable=False),
    sa.Column('forecast_type', sa.Enum('aircraft', 'aircraft_warfare', 'apv', 'artillery', 'fuel_tanks', 'helicopters', 'missiles', 'mlrs', 'personnel', 'special_equipment', 'submarines', 'tanks', 'uav', 'warships', name='lossesprojectenum'), nullable=False),
    sa.Column('parent_forecast_id', sa.Integer(), nullable=False),
    sa.Column('created_time', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_time', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.Column('deleted_time', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['parent_forecast_id'], ['forecasts.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id', 'parent_forecast_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('forecasts_data')
    op.drop_table('forecasts')
    # ### end Alembic commands ###