"""empty message

Revision ID: 39c9ef27c810
Revises: 
Create Date: 2023-12-06 18:31:39.968975

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '39c9ef27c810'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('events',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('resorts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('city', sa.String(), nullable=True),
    sa.Column('state', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('bookmarks',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('resort_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['resort_id'], ['resorts.id'], name=op.f('fk_bookmarks_resort_id_resorts')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_bookmarks_user_id_users')),
    sa.PrimaryKeyConstraint('user_id', 'resort_id')
    )
    op.create_table('resort_events',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('time', sa.Integer(), nullable=True),
    sa.Column('resort_id', sa.Integer(), nullable=True),
    sa.Column('event_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['event_id'], ['events.id'], name=op.f('fk_resort_events_event_id_events')),
    sa.ForeignKeyConstraint(['resort_id'], ['resorts.id'], name=op.f('fk_resort_events_resort_id_resorts')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_events',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('event_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['event_id'], ['resort_events.id'], name=op.f('fk_user_events_event_id_resort_events')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_user_events_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_events')
    op.drop_table('resort_events')
    op.drop_table('bookmarks')
    op.drop_table('users')
    op.drop_table('resorts')
    op.drop_table('events')
    # ### end Alembic commands ###
