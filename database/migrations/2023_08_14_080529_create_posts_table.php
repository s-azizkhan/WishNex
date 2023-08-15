<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->uuid('id')->unique()->primary();
            $table->uuid('parent_id')->nullable()->default(null);
            $table->text('content');
            $table->boolean('comment_status')->default(false);
            $table->bigInteger('comment_count')->default(0);
            $table->bigInteger('reaction_count')->default(0);
            $table->boolean('reaction_status')->default(false);
            
            // Define foreign key constraints
            $table->foreignUuid('author_id')->references('id')->on('users')->cascadeOnDelete();
            $table->foreignUuid('post_type_id')->references('id')->on('post_types')->cascadeOnDelete();
            $table->foreignUuid('visibility_id')->references('id')->on('visibility_types')->cascadeOnDelete();
            $table->foreignUuid('status_id')->references('id')->on('post_statuses')->cascadeOnDelete();

            $table->timestamps();
        });
        // Define the self-referencing foreign key
        Schema::table('posts', function (Blueprint $table) {
            $table->foreign('parent_id')->references('id')->on('posts')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
